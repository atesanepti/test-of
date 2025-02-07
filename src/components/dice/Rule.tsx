import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Rule = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to play this game</DialogTitle>

          <div className=" p-2">
            <ul className="list-disc pl-5 mt-3">
              <li className="text-white text-sm">Select any Number</li>
              <li className="text-white text-sm">Click on Dice Image</li>
              <li className="text-white text-sm">
                If the selected number is equal to the dice number total gets
                updated
              </li>
              <li className="text-white text-sm">
                If wrong -2 will be deducted
              </li>
            </ul>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Rule;
