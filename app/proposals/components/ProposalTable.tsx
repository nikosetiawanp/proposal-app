import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { getLuminance } from "@/utils/getLuminance";
import { cn } from "@/lib/utils";

const headerFooterCellStyle = "font-bold text-left px-2";
const rowStyle = "py-1 flex w-full";

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full">{children}</table>;
}

// Head
export function TableHead({ children }: { children: React.ReactNode }) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const accentColorLuminance = getLuminance(proposal?.settings?.accentColor);
  const tableHeaderStyle = proposal?.settings?.tableHeaderStyle;
  return (
    <thead
      className={"mx-9 flex justify-start border-y py-0.5"}
      style={
        tableHeaderStyle === "Solid"
          ? {
              backgroundColor: proposal?.settings?.accentColor,
              color:
                accentColorLuminance < 0.4
                  ? proposal?.settings?.backgroundColor
                  : proposal?.settings?.textColor,

              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }
          : tableHeaderStyle === "Soft"
            ? {
                backgroundColor: proposal?.settings?.accentColor + "10",
                color: proposal?.settings?.accentColor,
                borderTopColor: "transparent",
                borderBottomColor: "transparent",
              }
            : {
                backgroundColor: "transparent",
                color: proposal?.settings?.accentColor,
                borderTopColor: proposal?.settings?.accentColor,
                borderBottomColor: proposal?.settings?.accentColor,
              }
      }
    >
      {children}
    </thead>
  );
}

export function TableHeadRow({ children }: { children: React.ReactNode }) {
  return <tr className={cn(rowStyle)}>{children}</tr>;
}

export function TableHeadCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <th className={cn(headerFooterCellStyle, className)}>{children}</th>;
}

// Body
export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="flex flex-col">{children}</tbody>;
}

export function TableBodyRow({
  index,
  lastItem,
  children,
}: {
  index: number;
  lastItem: boolean;
  children: React.ReactNode;
}) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const odd = index % 2 === 1;
  const even = index % 2 === 0;
  const tableRowStyle = proposal?.settings?.tableRowStyle;

  return (
    <tr
      className={cn(rowStyle)}
      style={{
        borderBottomWidth: "1px",
        borderBottomColor:
          tableRowStyle === "Line" && !lastItem
            ? proposal?.settings?.textColor + "30"
            : "transparent",
        backgroundColor:
          tableRowStyle === "Color" && odd
            ? proposal?.settings?.accentColor + "10"
            : "transparent",
      }}
    >
      {children}
    </tr>
  );
}

export function TableBodyCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("", className)}>{children}</td>;
}

// Footer
export function TableFooter({ children }: { children: React.ReactNode }) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const accentColorLuminance = getLuminance(proposal?.settings?.accentColor);
  const tableFooterStyle = proposal?.settings?.tableFooterStyle;

  return (
    <tfoot
      className={cn("mx-9 flex justify-start border-y py-0.5")}
      style={
        tableFooterStyle === "Solid"
          ? {
              backgroundColor: proposal?.settings?.accentColor,
              color:
                accentColorLuminance < 0.4
                  ? proposal?.settings?.backgroundColor
                  : proposal?.settings?.textColor,

              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }
          : tableFooterStyle === "Soft"
            ? {
                backgroundColor: proposal?.settings?.accentColor + "10",
                color: proposal?.settings?.accentColor,
                borderTopColor: "transparent",
                borderBottomColor: "transparent",
              }
            : {
                backgroundColor: "transparent",
                color: proposal?.settings?.accentColor,
                borderTopColor: proposal?.settings?.accentColor,
                borderBottomColor: proposal?.settings?.accentColor,
              }
      }
    >
      {children}
    </tfoot>
  );
}

export function TableFooterRow({ children }: { children: React.ReactNode }) {
  return <tr className={cn(rowStyle)}>{children}</tr>;
}

export function TableFooterCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <th className={cn(headerFooterCellStyle, className)}>{children}</th>;
}
