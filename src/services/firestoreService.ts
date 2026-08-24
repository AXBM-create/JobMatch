import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  serverTimestamp 
} from "../firebase";
import { ApplicationResult, UserProfile, SubscriptionPlan, SubscriptionStatus } from "../types";

export async function getUserProfile(userId: string, email?: string, displayName?: string): Promise<UserProfile> {
  const defaultProfile: UserProfile = {
    userId,
    email: email || "",
    displayName: displayName || "",
    plan: "starter",
    subscriptionStatus: "free",
    creditsRemaining: 1, // 1 free application
    generationsCount: 0,
    createdAt: new Date().toISOString(),
  };

  if (!userId) return defaultProfile;

  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        userId,
        email: data.email || email || "",
        displayName: data.displayName || displayName || "",
        plan: (data.plan as SubscriptionPlan) || "starter",
        subscriptionStatus: (data.subscriptionStatus as SubscriptionStatus) || "free",
        creditsRemaining: typeof data.creditsRemaining === "number" ? data.creditsRemaining : 1,
        generationsCount: data.generationsCount || 0,
        stripeCustomerId: data.stripeCustomerId,
        stripeSubscriptionId: data.stripeSubscriptionId,
        currentPeriodEnd: data.currentPeriodEnd,
        createdAt: data.createdAt || new Date().toISOString(),
      };
    } else {
      // Initialize profile in Firestore
      await setDoc(docRef, {
        ...defaultProfile,
        updatedAt: serverTimestamp(),
      });
      return defaultProfile;
    }
  } catch (error) {
    console.error("Error getting user profile from Firestore:", error);
    return defaultProfile;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  if (!userId) return;
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error updating user profile in Firestore:", error);
  }
}

export async function consumeUserCredit(userId: string, currentProfile?: UserProfile | null): Promise<{ success: boolean; newCredits: number }> {
  if (!userId) return { success: false, newCredits: 0 };
  
  let profile = currentProfile;
  if (!profile) {
    profile = await getUserProfile(userId);
  }

  // If user is pro or executive, unlimited generations
  if (profile.plan === "pro" || profile.plan === "executive") {
    const newGenerationsCount = (profile.generationsCount || 0) + 1;
    await updateUserProfile(userId, { generationsCount: newGenerationsCount });
    return { success: true, newCredits: 9999 };
  }

  // Free starter plan
  if (profile.creditsRemaining > 0) {
    const newCredits = profile.creditsRemaining - 1;
    const newGenerationsCount = (profile.generationsCount || 0) + 1;
    await updateUserProfile(userId, {
      creditsRemaining: newCredits,
      generationsCount: newGenerationsCount,
    });
    return { success: true, newCredits };
  }

  return { success: false, newCredits: 0 };
}


export async function upgradeUserPlan(
  userId: string, 
  plan: SubscriptionPlan, 
  stripeCustomerId?: string, 
  stripeSubscriptionId?: string
): Promise<void> {
  if (!userId) return;
  const updates: Partial<UserProfile> = {
    plan,
    subscriptionStatus: "active",
    creditsRemaining: plan === "starter" ? 1 : 99999,
  };
  if (stripeCustomerId) updates.stripeCustomerId = stripeCustomerId;
  if (stripeSubscriptionId) updates.stripeSubscriptionId = stripeSubscriptionId;

  await updateUserProfile(userId, updates);
}

export async function saveApplicationToFirestore(userId: string, application: ApplicationResult) {
  if (!userId) return;
  try {
    const docRef = doc(db, "applications", application.id);
    await setDoc(docRef, {
      ...application,
      userId,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log("Application saved to Firestore:", application.id);
  } catch (error) {
    console.error("Error saving to Firestore:", error);
  }
}

export async function loadUserApplicationsFromFirestore(userId: string): Promise<ApplicationResult[]> {
  if (!userId) return [];
  try {
    const q = query(
      collection(db, "applications"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const results: ApplicationResult[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      results.push({
        id: data.id || docSnap.id,
        createdAt: data.createdAt || new Date().toISOString(),
        targetJob: data.targetJob,
        matchScore: data.matchScore,
        matchSummary: data.matchSummary,
        matchedKeywords: data.matchedKeywords || [],
        missingKeywords: data.missingKeywords || [],
        tailoringAdvice: data.tailoringAdvice || [],
        resume: data.resume,
        coverLetter: data.coverLetter,
        language: data.language || "fr",
        tone: data.tone || "balanced",
      });
    });
    // Sort descending by date
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return results;
  } catch (error) {
    console.error("Error loading applications from Firestore:", error);
    return [];
  }
}

export async function deleteApplicationFromFirestore(applicationId: string) {
  try {
    const docRef = doc(db, "applications", applicationId);
    await deleteDoc(docRef);
    console.log("Application deleted from Firestore:", applicationId);
  } catch (error) {
    console.error("Error deleting from Firestore:", error);
  }
}
