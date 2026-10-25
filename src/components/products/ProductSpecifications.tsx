import type { ReactNode } from "react";
import {
  Battery,
  CircleDot,
  Cpu,
  Gauge,
  Ruler,
  Weight,
  Zap,
} from "lucide-react";
import type { ProductQuickSpec, ProductSpecRow } from "@/types";

const quickIcons: Record<ProductQuickSpec["icon"], ReactNode> = {
  power: <Zap className="h-4 w-4" strokeWidth={1.75} />,
  efficiency: <Gauge className="h-4 w-4" strokeWidth={1.75} />,
  cell: <Cpu className="h-4 w-4" strokeWidth={1.75} />,
  dimensions: <Ruler className="h-4 w-4" strokeWidth={1.75} />,
  capacity: <Battery className="h-4 w-4" strokeWidth={1.75} />,
  voltage: <Zap className="h-4 w-4" strokeWidth={1.75} />,
  weight: <Weight className="h-4 w-4" strokeWidth={1.75} />,
  generic: <CircleDot className="h-4 w-4" strokeWidth={1.75} />,
};

interface QuickSpecsProps {
  specs: ProductQuickSpec[];
}

export function ProductQuickSpecs({ specs }: QuickSpecsProps) {
  if (specs.length === 0) return null;

  return (
    <ul className="divide-y divide-brand-border rounded-lg border border-brand-border">
      {specs.map((spec) => (
        <li
          key={spec.id}
          className="flex items-center justify-between gap-4 px-3.5 py-2.5 text-sm"
        >
          <span className="flex items-center gap-2.5 text-brand-muted">
            <span className="text-brand-green" aria-hidden>
              {quickIcons[spec.icon]}
            </span>
            {spec.label}
          </span>
          <span className="shrink-0 font-semibold text-brand-ink">
            {spec.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface SpecTableProps {
  rows: ProductSpecRow[];
  isDemo?: boolean;
}

export function ProductSpecTable({ rows, isDemo }: SpecTableProps) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-brand-border bg-brand-surface/40 px-4 py-8 text-center text-sm text-brand-muted">
        Specifications for this product are not published yet.
      </p>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-brand-border">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Technical specifications</caption>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-brand-border last:border-b-0 odd:bg-white even:bg-[#f8faf9]"
              >
                <th
                  scope="row"
                  className="w-[45%] px-4 py-3 font-medium text-brand-muted sm:w-1/2"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3 font-semibold text-brand-ink">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDemo && (
        <p className="mt-3 text-[11px] text-brand-muted">
          * Illustrative values for UI development — confirm against official
          datasheets before publication.
        </p>
      )}
    </div>
  );
}
