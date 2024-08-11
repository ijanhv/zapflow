import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SingleZap from "./single-zap";
import { Button } from "../ui/button";
import Image from "next/image";
import Tabs from "../common/tabs";
import { initiateOAuth } from "@/app/actions/oauth";
import {  useRouter } from "next/navigation";

const SelectedAction = ({
  action,
  openActionModal,
  index,
}: {
  action: AvailableAction;
  openActionModal: (index?: number) => void;
  index: number;
}) => {
    const router = useRouter()

    const handleConnectApp = () => {
        initiateOAuth(action.service).then((res) => router.push(res) )
    }
  const tabs = [
    {
      title: "App and event",
      content: (
        <div className="flex flex-col gap-4 w-full">

    
        <div className="w-full border rounded-md p-3 flex items-center justify-between">
          <div className=" flex items-center gap-3">
            <Image
              src={action.image}
              height={45}
              alt="action"
              width={45}
              className="object-contain"
              unoptimized
            />
            <p className="uppercase font-semibold">{action.service}</p>
          </div>
          <Button
            onClick={() => {
              openActionModal(index);
            }}
          >
            Edit Action
          </Button>
        </div>

            <div className="space-y-2">

                    <span className="text-sm">ACTION</span>
                    <p className="font-medium text-xl">
                        {action.name}
                    </p>
            </div>
        </div>
      ),
    },
    {
      title: "Connect your app",
      content:   <div className="w-full border rounded-md p-3 flex items-center justify-between">
      <div className=" flex items-center gap-3">
        <Image
          src={action.image}
          height={45}
          alt="action"
          width={45}
          className="object-contain"
          unoptimized
        />
        <p className="uppercase font-semibold">{action.service}</p>
      </div>
      <Button
        onClick={handleConnectApp}
      >
       Connect to {action.service}
      </Button>
    </div>
    },
    {
      title: "Choose data",
      content: <div>Choose data</div>,
    },
    {
      title: "Test ",
      content: <div>Test your app</div>,
    },
  ];
  return (
    <div className="pt-2 flex justify-center" key={action.id}>
      <Sheet>
        <SheetTrigger>
          <div>
            <SingleZap
              name={action.name}
              selected={true}
              configured={false}
              index={index + 2}
            />
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col justify-between h-full"> 
          <div className="flex flex-col gap-3">

    
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3 border-b pb-3">
              <div className="border rounded-md p-1">
                <Image
                  src={action.image}
                  height={25}
                  alt="action"
                  width={25}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p>
                {index + 1}. {action.name}
              </p>
            </SheetTitle>
            <SheetClose />
          </SheetHeader>
          <div className="">
            <Tabs tabs={tabs} />
          </div>
          </div>
          <SheetFooter className="sm:justify-start">
            <Button
  
            className="">
                Continue
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SelectedAction;
