"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "radix-ui";
import React, { useEffect, useMemo, useState } from "react";

import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

import { ChevronDownIcon } from "lucide-react";
import { headingFonts, bodyFonts, fontPairings } from "@/data/proposal/fonts";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RightSidebar() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  const accordionContentStyle = "flex flex-col gap-4 h-fit px-4";
  const accordionTriggerStyle = "font-bold px-4 text-[12px]";
  const fieldLabelStyle = "text-xs";

  return (
    <div className="hidden w-[512px] border-l border-zinc-300 bg-white lg:block">
      {/* Font Change */}
      <div className="p-4">
        <span className="text-primary font-bold">Settings</span>
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
                  <DialogTrigger
                    disabled={proposal?.settings?.typography?.useCustomFont}
                  >
                    <Button
                      className={cn(
                        "w-full justify-between",
                        "bg-white font-normal hover:bg-white",
                        proposal?.settings?.typography?.useCustomFont &&
                          "opacity-50",
                      )}
                      variant="outline"
                      asChild
                      disabled={proposal?.settings?.typography?.useCustomFont}
                    >
                      <span className="text-normal text-sm">
                        {proposal?.settings?.typography?.headingFont} +{" "}
                        {proposal?.settings?.typography?.bodyFont}
                        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[768px]">
                    <DialogHeader>
                      <DialogTitle>Select Font Pairing</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-8 overflow-y-scroll">
                      {fontPairings.map((pairing, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-1">
                            <span>{pairing.name}</span>
                            <DialogClose
                              onClick={() => {
                                setProposal({
                                  ...proposal,
                                  settings: {
                                    ...proposal?.settings,
                                    typography: {
                                      ...proposal?.settings?.typography,
                                      headingFont: pairing.headingFont,
                                      bodyFont: pairing.bodyFont,
                                    },
                                  },
                                });
                              }}
                            >
                              <div className="border-input bg-primary flex h-48 w-full flex-col items-start justify-center gap-2 rounded-md border p-4 hover:cursor-pointer hover:opacity-50">
                                <span
                                  className="text-left text-4xl font-bold text-white"
                                  style={{
                                    fontFamily: pairing.headingFont,
                                    // color:
                                    //   proposal?.settings?.colorPalette?.textColor,
                                  }}
                                >
                                  Heading Font
                                </span>
                                <span
                                  className="text-left text-sm text-white"
                                  style={{
                                    fontFamily: pairing.bodyFont,
                                    // color:
                                    //   proposal?.settings?.colorPalette?.textColor,
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
                        typography: {
                          ...proposal?.settings?.typography,
                          useCustomFont:
                            !proposal?.settings?.typography?.useCustomFont,
                        },
                      },
                    });
                  }}
                  checked={proposal?.settings?.typography?.useCustomFont}
                />
                <Label htmlFor="use-custom-font" className="text-xs">
                  Use custom font
                </Label>
              </Field>

              {proposal?.settings?.typography?.useCustomFont && (
                <>
                  <Separator />
                  {/* Heading Font */}
                  <Field>
                    <FieldLabel className={fieldLabelStyle}>
                      Heading font
                    </FieldLabel>
                    <Select
                      value={proposal?.settings?.typography?.headingFont}
                      onValueChange={(value) => {
                        setProposal({
                          ...proposal,
                          settings: {
                            ...proposal?.settings,
                            typography: {
                              ...proposal?.settings?.typography,
                              headingFont: value,
                            },
                          },
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {["Sans", "Serif", "Mono"].map((category, index) => {
                          return (
                            <React.Fragment key={index}>
                              {headingFonts.find(
                                (font) => font.category === category,
                              ) && (
                                <SelectGroup key={index}>
                                  <SelectLabel>{category}</SelectLabel>
                                  {headingFonts.map((font, index) => {
                                    return (
                                      font.category === category && (
                                        <SelectItem
                                          key={index}
                                          value={font.value}
                                          style={{ fontFamily: font.value }}
                                        >
                                          {font.name}
                                        </SelectItem>
                                      )
                                    );
                                  })}
                                </SelectGroup>
                              )}
                              {index < 3 && <Separator />}
                            </React.Fragment>
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
                      value={proposal?.settings?.typography?.bodyFont}
                      onValueChange={(value) => {
                        setProposal({
                          ...proposal,
                          settings: {
                            ...proposal?.settings,
                            typography: {
                              ...proposal?.settings?.typography,
                              bodyFont: value,
                            },
                          },
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent position="popper">
                        {["Sans", "Serif", "Mono"].map((category, index) => {
                          return (
                            <React.Fragment key={index}>
                              {bodyFonts.find(
                                (font) => font.category === category,
                              ) && (
                                <SelectGroup key={index}>
                                  <SelectLabel>{category}</SelectLabel>
                                  {bodyFonts.map((font, index) => {
                                    return (
                                      font.category === category && (
                                        <SelectItem
                                          key={index}
                                          value={font.value}
                                          style={{ fontFamily: font.value }}
                                        >
                                          {font.name}
                                        </SelectItem>
                                      )
                                    );
                                  })}
                                </SelectGroup>
                              )}
                              {index < 3 && <Separator />}
                            </React.Fragment>
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
                              className="border-input hover:border-primary flex overflow-hidden rounded-xs border-2 shadow-xs hover:cursor-pointer"
                              key={index}
                              onClick={() => {
                                setProposal({
                                  ...proposal,
                                  settings: {
                                    ...proposal?.settings,
                                    colorPalette: {
                                      backgroundColor: color.backgroundColor,
                                      textColor: color.textColor,
                                      accentColor: color.accentColor,
                                    },
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
              {/* Time Unit */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Time Unit</FieldLabel>
                <ToggleGroup
                  type="single"
                  size="sm"
                  value={proposal?.settings?.format?.timeUnit}
                  onValueChange={(
                    value: Proposal["settings"]["format"]["timeUnit"],
                  ) => {
                    if (!value) return;
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        format: {
                          ...proposal?.settings?.format,
                          timeUnit: value,
                        },
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

              {/* Date */}
              <Field>
                <FieldLabel className={fieldLabelStyle}>Date</FieldLabel>
                <Select
                  value={proposal?.settings?.format?.date}
                  onValueChange={(value) => {
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        format: {
                          ...proposal?.settings?.format,
                          date: value as any,
                        },
                      },
                    });
                  }}
                >
                  <SelectTrigger>
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
                  size="sm"
                  className="w-auto"
                  type="single"
                  value={proposal?.settings?.format?.currency}
                  onValueChange={(value) => {
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        format: {
                          ...proposal?.settings?.format,
                          currency: value,
                        },
                      },
                    });
                  }}
                >
                  {currencies.map((currency, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        variant="outline"
                        className="flex-1 font-bold"
                        value={currency.code}
                      >
                        {currency.symbol}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </Field>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bullets-and-numbering">
            <AccordionTrigger className={accordionTriggerStyle}>
              FORMAT
            </AccordionTrigger>
            <AccordionContent
              className={accordionContentStyle}
            ></AccordionContent>
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
                  value={proposal?.settings?.print?.paperSize}
                  onValueChange={(
                    value: Proposal["settings"]["print"]["paperSize"],
                  ) => {
                    setProposal({
                      ...proposal,
                      settings: {
                        ...proposal?.settings,
                        print: {
                          ...proposal?.settings?.print,
                          paperSize: value,
                        },
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
        </Accordion>
      </div>
    </div>
  );
}
