import feedbackImg1 from "@/assets/images/ỤM BÒ-11.png";
import feedbackImg2 from "@/assets/images/ỤM BÒ-12.png";
import feedbackImg3 from "@/assets/images/ỤM BÒ-13.png";
import feedbackImg4 from "@/assets/images/ỤM BÒ-14.png";

const FEEDBACK_STORAGE_KEY = "umbo_feedbacks_v1";

const defaultFeedbacks = [
  {
    id: "default-feedback-1",
    image: feedbackImg1,
    order: 1,
    createdAt: "2024-01-15T00:00:00.000Z",
    alt: "Feedback 1",
  },
  {
    id: "default-feedback-2",
    image: feedbackImg2,
    order: 2,
    createdAt: "2024-01-16T00:00:00.000Z",
    alt: "Feedback 2",
  },
  {
    id: "default-feedback-3",
    image: feedbackImg3,
    order: 3,
    createdAt: "2024-01-17T00:00:00.000Z",
    alt: "Feedback 3",
  },
  {
    id: "default-feedback-4",
    image: feedbackImg4,
    order: 4,
    createdAt: "2024-01-18T00:00:00.000Z",
    alt: "Feedback 4",
  },
];

function normalizeFeedbacks(feedbacks = []) {
  return [...feedbacks]
    .filter(Boolean)
    .map((item, index) => ({
      id: item.id || `feedback-${Date.now()}-${index}`,
      image: item.image || "",
      order: Number(item.order) || index + 1,
      createdAt: item.createdAt || new Date().toISOString(),
      alt: item.alt || `Feedback ${index + 1}`,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item, index) => ({ ...item, order: index + 1 }));
}

export function getFeedbacks() {
  if (typeof window === "undefined") {
    return normalizeFeedbacks(defaultFeedbacks);
  }

  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) {
      return normalizeFeedbacks(defaultFeedbacks);
    }
    const parsed = JSON.parse(raw);
    return normalizeFeedbacks(Array.isArray(parsed) ? parsed : []);
  } catch {
    return normalizeFeedbacks(defaultFeedbacks);
  }
}

export function saveFeedbacks(feedbacks) {
  const normalized = normalizeFeedbacks(feedbacks);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      FEEDBACK_STORAGE_KEY,
      JSON.stringify(normalized),
    );
  }
  return normalized;
}

export function resetFeedbacks() {
  return saveFeedbacks(defaultFeedbacks);
}
