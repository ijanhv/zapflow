import React from "react";
import { useGetDriveFoldersQuery } from "@/hooks/use-drive-query";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { TZapCreate } from "@/schema/zod-schema";

interface ActionComponentProps {
  action: AvailableAction;
  index: number;
  form: UseFormReturn<TZapCreate>;
}

const ActionComponent: React.FC<ActionComponentProps> = ({
  action,
  index,
  form,
}) => {
  const { data: folders, isPending, isError } = useGetDriveFoldersQuery();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>App not connected</div>;

  const handleInputChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      form.setValue(`actions.${index}.actionMetadata.${field}`, e.target.value);
    };

  const handleFolderChange = (value: string) => {
    form.setValue(`actions.${index}.actionMetadata.folderId`, value);
  };

  const renderActionFields = () => {
    switch (action?.actionType) {
      case "send-sol":
        return (
          <div className="flex flex-col gap-3 w-full px-2">
            <Input
              {...form.register(
                `actions.${index}.actionMetadata.recipientAddress`
              )}
              placeholder="Recipient Address"
              onChange={handleInputChange("recipientAddress")}
            />
            <Input
              {...form.register(`actions.${index}.actionMetadata.amount`)}
              placeholder="Amount"
              onChange={handleInputChange("amount")}
            />
            <Input
              {...form.register(`actions.${index}.actionMetadata.currency`)}
              placeholder="Currency"
              onChange={handleInputChange("currency")}
            />
          </div>
        );

      case "email":
        return (
          <div className="flex flex-col gap-3 w-full px-2">
            <Input
              {...form.register(
                `actions.${index}.actionMetadata.recipientEmail`
              )}
              placeholder="Recipient Email"
              onChange={handleInputChange("recipientEmail")}
            />
            <Input
              {...form.register(`actions.${index}.actionMetadata.subject`)}
              placeholder="Subject"
              onChange={handleInputChange("subject")}
            />
            <Textarea
              {...form.register(`actions.${index}.actionMetadata.body`)}
              placeholder="Email Body"
              onChange={handleInputChange("body")}
            />
          </div>
        );

      case "add-folder":
        return (
          <div className="flex flex-col gap-3 w-full px-2">
            <Select
              onValueChange={handleFolderChange}
              defaultValue={form.getValues(
                `actions.${index}.actionMetadata.folderId`
              )}
            >
              <SelectTrigger className="text-left">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Folders</SelectLabel>
                  {folders.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      className="w-full text-left"
                    >
                      <p className="text-base font-semibold">{item.name}</p>
                      <span className="text-foreground/60">{item.id}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              {...form.register(`actions.${index}.actionMetadata.folderName`)}
              placeholder="Enter folder Name"
              onChange={handleInputChange("folderName")}
            />
          </div>
        );

      case "add-file":
        return (
          <div className="flex flex-col gap-3 w-full px-2">
            <Select
              onValueChange={handleFolderChange}
              defaultValue={form.getValues(
                `actions.${index}.actionMetadata.folderId`
              )}
            >
              <SelectTrigger className="text-left">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Folders</SelectLabel>
                  {folders.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      className="w-full text-left"
                    >
                      <p className="text-base font-semibold">{item.name}</p>
                      <span className="text-foreground/60">{item.id}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              {...form.register(`actions.${index}.actionMetadata.fileName`)}
              placeholder="Enter File Name"
              onChange={handleInputChange("fileName")}
            />
            <Textarea
              {...form.register(`actions.${index}.actionMetadata.fileContent`)}
              placeholder="Enter File Content"
              onChange={handleInputChange("fileContent")}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return <>{renderActionFields()}</>;
};

export default ActionComponent;
