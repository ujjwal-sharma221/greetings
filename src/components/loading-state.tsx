import { Spinner } from "./spinner";

interface LoadingStateProps {
  title: string;
  description: string;
}

export function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-8">
      <div className="bg-background flex w-96 flex-col items-center justify-center gap-y-6 rounded-lg p-10">
        <Spinner size="size-6" />
        <div className="flex flex-col gap-y-6 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
