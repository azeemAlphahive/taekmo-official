import { Star } from "lucide-react";
import type { ProductReview } from "@/types";

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-brand-border bg-brand-surface/40 px-4 py-10 text-center">
        <Star
          className="mx-auto h-8 w-8 text-brand-muted/50"
          strokeWidth={1.5}
          aria-hidden
        />
        <p className="mt-3 text-sm font-medium text-brand-ink">
          No reviews yet
        </p>
        <p className="mt-1 text-xs text-brand-muted">
          Customer reviews will appear here once verified feedback is available.
          We do not display sample ratings or testimonials.
        </p>
      </div>
    );
  }

  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <p className="text-3xl font-bold text-brand-ink">
          {average.toFixed(1)}
        </p>
        <div>
          <div
            className="flex gap-0.5 text-amber-400"
            aria-label={`${average.toFixed(1)} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-current"
                strokeWidth={0}
                aria-hidden
              />
            ))}
          </div>
          <p className="mt-0.5 text-xs text-brand-muted">
            Based on {reviews.length} verified review
            {reviews.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-lg border border-brand-border bg-white p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-brand-ink">
                {review.author}
              </p>
              <p className="text-xs text-brand-muted">{review.date}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {review.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
