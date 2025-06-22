import VariableFontHoverByLetter from "@/components/variable-font-hover-by-letter";

export function ProcessingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg px-4 py-5 text-3xl">
      <VariableFontHoverByLetter
        label="Meeting is Completed, and a summary will appear soon"
        fromFontVariationSettings="'wght' 400, 'slnt' 0"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
        staggerFrom={"last"}
      />
    </div>
  );
}
