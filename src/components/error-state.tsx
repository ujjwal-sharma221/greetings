import { GlowEffect } from "./ui/glow-effect";

interface ErrorState {
  title: string;
  description: string;
}

export function ErrorState({ title, description }: ErrorState) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative flex h-64 w-96 items-center justify-center">
        <GlowEffect
          colors={["#FF0000", "#FF4444", "#FF6B6B", "#FF9999"]}
          mode="static"
          blur="medium"
        />
        <div className="bg-background relative h-64 w-96 rounded-lg p-2 text-black dark:bg-white dark:text-black">
          <div className="flex flex-col gap-y-6 text-center">
            <h6 className="text-lg font-medium">{title}</h6>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
