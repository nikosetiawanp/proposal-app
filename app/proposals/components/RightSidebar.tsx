"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "radix-ui";
import React, { useEffect, useMemo, useState } from "react";

import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

import { ChevronDownIcon } from "lucide-react";
import { fontPairings, fonts } from "@/data/proposal/fonts";
import { Proposal } from "@/types/proposal";
import Divider from "@/components/Divider";
import { currencies } from "@/data/currencies";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { colorPresets } from "@/data/proposal/colorPresets";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function RightSidebar() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  const accordionContentStyle = "flex flex-col gap-4 h-fit px-4";
  const accordionTriggerStyle = "font-bold px-4 text-[12px]";
  const fieldLabelStyle = "text-xs";

  return (
    <div className="w-lg border-l border-zinc-300 bg-white">
      {/* Font Change */}
      <div className="p-4">
        <span className="font-bold">Proposal Settings</span>
      </div>
      <Separator />
      <div className="scroll-hidden h-full overflow-y-auto pb-32">
        <Accordion
          type="multiple"
          // collapsible
          // defaultValue="typography"
          className="flex flex-col"
        >
          <AccordionItem value="typography">
            <AccordionTrigger className={accordionTriggerStyle}>
              TYPOGRAPHY
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              {/* Fonts */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Fonts</FieldLabel>
                <Dialog>
                  <DialogTrigger disabled={proposal?.settings?.useCustomFont}>
                    <Button
                      className={cn(
                        "w-full justify-between",
                        "bg-background hover:bg-background font-normal",
                        proposal?.settings?.useCustomFont && "opacity-50",
                      )}
                      variant="outline"
                      asChild
                      disabled={proposal?.settings?.useCustomFont}
                    >
                      <span className="text-normal text-sm">
                        {proposal?.settings?.headingFont} +{" "}
                        {proposal?.settings?.bodyFont}
                        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Select Font Pairing</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-8 overflow-y-scroll">
                      {fontPairings.map((pairing, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-1">
                            <span>
                              {pairing.headingFont} + {pairing.bodyFont}
                            </span>
                            <DialogClose
                              onClick={() => {
                                setProposal({
                                  ...proposal,
                                  settings: {
                                    ...proposal?.settings,
                                    headingFont: pairing.headingFont,
                                    bodyFont: pairing.bodyFont,
                                  },
                                });
                              }}
                            >
                              <div className="border-input bg-primary flex h-48 w-full flex-col items-start justify-center gap-2 rounded-md border p-4 hover:cursor-pointer hover:opacity-50">
                                <span
                                  className={cn(
                                    "text-left text-4xl font-bold text-white",
                                  )}
                                  style={{
                                    fontFamily: pairing.headingFont,
                                  }}
                                >
                                  Heading Font
                                </span>
                                <span
                                  className="text-left text-sm text-white"
                                  style={{
                                    fontFamily: pairing.bodyFont,
                                  }}
                                >
                                  And this is your body font
                                </span>
                              </div>
                            </DialogClose>
                          </div>
                        );
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
              </Field>

              <Field orientation="horizontal">
                <Checkbox
                  id="use-custom-font"
                  onClick={() => {
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        useCustomFont: !proposal?.settings?.useCustomFont,
                      },
                    });
                  }}
                  checked={proposal?.settings?.useCustomFont}
                />
                <Label htmlFor="use-custom-font" className="text-xs">
                  Custom font
                </Label>
              </Field>

              {proposal?.settings?.useCustomFont && (
                <>
                  <Separator />
                  {/* Heading Font */}
                  <Field>
                    <FieldLabel className={fieldLabelStyle}>
                      Heading font
                    </FieldLabel>
                    <Select
                      value={proposal?.settings?.headingFont}
                      onValueChange={(value) => {
                        setProposal({
                          ...proposal,
                          settings: {
                            ...proposal?.settings,
                            headingFont: value,
                          },
                        });
                      }}
                    >
                      <SelectTrigger className="bg-background hover:bg-background w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {fonts.map((font, index) => {
                          return (
                            <SelectItem
                              key={index}
                              value={font}
                              style={{ fontFamily: font }}
                            >
                              {font}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </Field>

                  {/* Body Font */}
                  <Field>
                    <FieldLabel className={fieldLabelStyle}>
                      Body font
                    </FieldLabel>
                    <Select
                      value={proposal?.settings?.bodyFont}
                      onValueChange={(value) => {
                        setProposal({
                          ...proposal,
                          settings: {
                            ...proposal?.settings,
                            bodyFont: value,
                          },
                        });
                      }}
                    >
                      <SelectTrigger className="bg-background hover:bg-background">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent position="popper">
                        {fonts.map((font, index) => {
                          return (
                            <SelectItem
                              key={index}
                              value={font}
                              style={{ fontFamily: font }}
                            >
                              {font}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </Field>
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="color-palette">
            <AccordionTrigger className={accordionTriggerStyle}>
              COLOR PALETTE
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              <Field>
                <FieldLabel className={fieldLabelStyle}>Theme</FieldLabel>
                <ToggleGroup
                  type="single"
                  size="sm"
                  value={proposal?.settings?.theme}
                  onValueChange={(value: Proposal["settings"]["theme"]) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        theme: value,
                      },
                    });
                  }}
                >
                  {["Light", "Dark", "Accent"].map((theme, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        variant="outline"
                        value={theme}
                        className="flex-1"
                      >
                        {theme}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>
              <div className="flex justify-between">
                {Object.entries(colorPresets).map(
                  ([category, colors], index) => {
                    return (
                      <div className="flex flex-col gap-2" key={index}>
                        <span className="text-xs font-semibold">
                          {category}
                        </span>
                        {colors.map((color, index) => {
                          return (
                            <div
                              className="border-input hover:border-primary flex w-fit overflow-hidden rounded-xs border-2 shadow-xs hover:cursor-pointer"
                              key={index}
                              onClick={() => {
                                setProposal({
                                  ...proposal,
                                  settings: {
                                    ...proposal?.settings,
                                    backgroundColor: color.backgroundColor,
                                    textColor: color.textColor,
                                    accentColor: color.accentColor,
                                  },
                                });
                              }}
                            >
                              <div
                                className="h-4 w-4"
                                style={{
                                  backgroundColor: color.backgroundColor,
                                }}
                              />
                              <div
                                className="h-4 w-4"
                                style={{ backgroundColor: color.textColor }}
                              />
                              <div
                                className="h-4 w-4"
                                style={{ backgroundColor: color.accentColor }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  },
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="date-and-time">
            <AccordionTrigger className={accordionTriggerStyle}>
              DATE & TIME
            </AccordionTrigger>

            <AccordionContent className={accordionContentStyle}>
              {/* Date */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Date</FieldLabel>
                <Select
                  value={proposal?.settings?.dateFormat}
                  onValueChange={(value) => {
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        dateFormat: value as any,
                      },
                    });
                  }}
                >
                  <SelectTrigger className="bg-background hover:bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {["d MMMM yyyy", "MMMM, d yyyy"].map((f, index) => (
                      <SelectItem key={index} value={f}>
                        {format(new Date(), f)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>{" "}
              {/* Time Unit */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Time Unit</FieldLabel>
                <ToggleGroup
                  type="single"
                  size="sm"
                  value={proposal?.settings?.timeUnit}
                  onValueChange={(value: Proposal["settings"]["timeUnit"]) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        timeUnit: value,
                      },
                    });
                  }}
                >
                  {["Hour", "Day", "Week", "Month", "Year"].map(
                    (unit, index) => {
                      return (
                        <ToggleGroupItem
                          key={index}
                          value={unit}
                          className="flex-1"
                          variant="outline"
                        >
                          {unit}
                        </ToggleGroupItem>
                      );
                    },
                  )}
                </ToggleGroup>
              </Field>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="numbers-and-currency">
            <AccordionTrigger className={accordionTriggerStyle}>
              NUMBERS & CURRENCY
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              {/* Currency */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Currency</FieldLabel>
                <ToggleGroup
                  disabled={proposal?.settings?.useCustomCurrency}
                  size="sm"
                  className="w-auto"
                  type="single"
                  value={
                    proposal?.settings?.useCustomCurrency
                      ? proposal?.settings?.customCurrency
                      : proposal?.settings?.currency
                  }
                  onValueChange={(value) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        currency: value,
                      },
                    });
                  }}
                >
                  {["$", "€", "£"].map((currency, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        variant="outline"
                        className="flex-1 font-bold"
                        value={currency}
                      >
                        {currency}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>

              <Field orientation="horizontal">
                <Checkbox
                  id="use-custom-currency"
                  onCheckedChange={() => {
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        useCustomCurrency:
                          !proposal?.settings?.useCustomCurrency,
                      },
                    });
                  }}
                  checked={proposal?.settings?.useCustomCurrency}
                />
                <Label htmlFor="use-custom-currency" className="text-xs">
                  Custom currency
                </Label>
              </Field>

              {proposal?.settings?.useCustomCurrency && (
                <>
                  <Separator />
                  <Field>
                    <FieldLabel className={fieldLabelStyle}>
                      Custom currency
                    </FieldLabel>
                    <Input
                      value={proposal?.settings?.customCurrency}
                      onChange={(e) => {
                        setProposal({
                          ...proposal,
                          settings: {
                            ...proposal?.settings,
                            customCurrency: e.target.value,
                          },
                        });
                      }}
                    />
                  </Field>
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="paper">
            <AccordionTrigger className={accordionTriggerStyle}>
              PAPER
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              {/* Paper Size */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Paper size</FieldLabel>
                <ToggleGroup
                  size="sm"
                  type="single"
                  value={proposal?.settings?.paperSize}
                  onValueChange={(value: Proposal["settings"]["paperSize"]) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        paperSize: value,
                      },
                    });
                  }}
                >
                  {["Letter", "A4"].map((size, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        value={size}
                        variant="outline"
                        className="flex-1"
                      >
                        {size}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="table">
            <AccordionTrigger className={accordionTriggerStyle}>
              TABLE
            </AccordionTrigger>
            <AccordionContent className={accordionContentStyle}>
              {/* Header Style */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>
                  Header Style
                </FieldLabel>
                <ToggleGroup
                  size="sm"
                  type="single"
                  value={proposal?.settings?.tableHeaderStyle}
                  onValueChange={(
                    value: Proposal["settings"]["tableHeaderStyle"],
                  ) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        tableHeaderStyle: value,
                      },
                    });
                  }}
                >
                  {["Solid", "Soft", "Minimal"].map((size, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        value={size}
                        variant="outline"
                        className="flex-1"
                      >
                        {size}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>

              {/* Row Style */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Row Style</FieldLabel>
                <ToggleGroup
                  size="sm"
                  type="single"
                  value={proposal?.settings?.tableRowStyle}
                  onValueChange={(
                    value: Proposal["settings"]["tableRowStyle"],
                  ) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        tableRowStyle: value,
                      },
                    });
                  }}
                >
                  {["None", "Line", "Color"].map((size, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        value={size}
                        variant="outline"
                        className="flex-1"
                      >
                        {size}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>

              {/* Footer Style */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>
                  Footer Style
                </FieldLabel>
                <ToggleGroup
                  size="sm"
                  type="single"
                  value={proposal?.settings?.tableFooterStyle}
                  onValueChange={(
                    value: Proposal["settings"]["tableFooterStyle"],
                  ) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        tableFooterStyle: value,
                      },
                    });
                  }}
                >
                  {["Solid", "Soft", "Minimal"].map((size, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        value={size}
                        variant="outline"
                        className="flex-1"
                      >
                        {size}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
