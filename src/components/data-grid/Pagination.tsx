import { Button } from "@nextui-org/react";

interface Props {
  onPrev: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

export const Pagination = ({
  onNext,
  onPrev,
  disableNext,
  disablePrevious,
}: Props) => {
  return (
    <div className="flex gap-x-2">
      <Button disabled={disablePrevious} onClick={() => onPrev()}>
        Previous
      </Button>
      <Button disabled={disableNext} onClick={() => onNext()}>
        next
      </Button>
    </div>
  );
};
