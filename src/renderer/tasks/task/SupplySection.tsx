import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useId } from "react";
import { format } from "date-fns/format";
import * as Yup from "yup";

import { TaskSupply, TaskWithRecords, UpsertTaskSupplyData } from "../../../main/api/types";
import { calculateEstimatedEndDate, calculateRemainingSupply } from "../utils";
import ButtonModal from "@/renderer/common/forms/ButtonModal";
import FieldInput from "@/renderer/ui/form/FieldInput";
import ModalFormWrapper from "@/renderer/ui/form/ModalFormWrapper";

const SupplySchema = Yup.object().shape({
  quantity: Yup.number().required("Required").positive("Must be positive"),
  unit: Yup.string().required("Required").max(32, "Too long"),
  itemsPerUnit: Yup.number()
    .transform((v, o) => (o === "" || o === undefined ? undefined : v))
    .positive("Must be positive")
    .optional(),
  itemUnit: Yup.string().max(32, "Too long").optional(),
  lastRefillDate: Yup.string().optional(),
});

interface SupplyFormValues {
  quantity: string;
  unit: string;
  itemsPerUnit: string;
  itemUnit: string;
  lastRefillDate: string;
}

interface SupplySectionProps {
  taskId: number;
  supply: TaskSupply | null;
  daysOfWeekRepeat: number[];
  onSupplyUpdate: (task: TaskWithRecords) => void;
}

const formatDateForInput = (date: Date | string | null) => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "yyyy-MM-dd");
};

const SupplySection = ({
  taskId,
  supply,
  daysOfWeekRepeat,
  onSupplyUpdate,
}: SupplySectionProps) => {
  const formId = useId();
  const initialValues: SupplyFormValues = {
    quantity: supply ? String(supply.quantity) : "",
    unit: supply?.unit ?? "",
    itemsPerUnit: supply?.itemsPerUnit != null ? String(supply.itemsPerUnit) : "",
    itemUnit: supply?.itemUnit ?? "",
    lastRefillDate: supply ? formatDateForInput(supply.lastRefillDate) : "",
  };

  const handleSubmit = async (
    values: SupplyFormValues,
    actions: FormikHelpers<SupplyFormValues>
  ) => {
    const data: UpsertTaskSupplyData = {
      taskId,
      quantity: parseFloat(values.quantity),
      unit: values.unit,
      itemsPerUnit: values.itemsPerUnit ? parseFloat(values.itemsPerUnit) : undefined,
      itemUnit: values.itemUnit || undefined,
      lastRefillDate: values.lastRefillDate || undefined,
    };
    const updatedTask = await window.tasksApi.upsertTaskSupply(data);
    onSupplyUpdate(updatedTask);
    actions.setSubmitting(false);
  };

  const remainingSupply =
    supply &&
    calculateRemainingSupply({
      quantity: supply.quantity,
      itemsPerUnit: supply.itemsPerUnit,
      daysOfWeekRepeat,
      lastRefillDate: supply.lastRefillDate,
    });

  const SupplyForm = ({ onClose }: { onClose: () => void }) => {
    const handleFormSubmit = async (
      vals: SupplyFormValues,
      actions: FormikHelpers<SupplyFormValues>
    ) => {
      await handleSubmit(vals, actions);
      onClose();
    };

    return (
    <Formik
      initialValues={initialValues}
      validationSchema={SupplySchema}
      onSubmit={handleFormSubmit}
    >
      {() => (
        <Form id={formId}>
          <ModalFormWrapper
            header={supply ? "Edit supply" : "Add supply info"}
            actions={
              <>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button form={formId} type="submit" colorScheme="blue">
                  Save
                </Button>
              </>
            }
          >
            <FieldInput mb={2} name="quantity" label="Quantity:" type="number" />
            <FieldInput mb={2} name="unit" label="Unit (box, pills, ml, etc.):" />
            <FieldInput
              mb={2}
              name="itemsPerUnit"
              label="Items per unit (e.g. syringes per box):"
              type="number"
            />
            <FieldInput
              mb={2}
              name="itemUnit"
              label="Item name (e.g. syringe) - for display:"
            />
            <FieldInput mb={2} name="lastRefillDate" label="Last refill date:" type="date" />
          </ModalFormWrapper>
        </Form>
      )}
    </Formik>
    );
  };

  return (
    <Box mt={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Heading size="md">Supply</Heading>
        <ButtonModal buttonText={supply ? "Edit" : "Add supply info"}>
          {(onClose) => <SupplyForm onClose={onClose} />}
        </ButtonModal>
      </Flex>
      {supply ? (
        <Box p={3} borderWidth={1} borderRadius="md">
          {supply.itemsPerUnit != null ? (
            <Text>
              <strong>
                {(remainingSupply?.unitsLeft ?? supply.quantity).toFixed(2)}
              </strong>{" "}
              {supply.unit}
              {supply.itemUnit
                ? ` (${supply.itemsPerUnit} ${supply.itemUnit} each)`
                : ` × ${supply.itemsPerUnit} each`}
              {" = "}
              <strong>
                {(
                  remainingSupply?.itemsLeft ??
                  supply.quantity * supply.itemsPerUnit
                ).toFixed(0)}
              </strong>
              {supply.itemUnit ? ` ${supply.itemUnit}` : " items"} available
            </Text>
          ) : (
            <Text>
              <strong>{supply.quantity}</strong> {supply.unit} available
            </Text>
          )}
          {calculateEstimatedEndDate({
            quantity: supply.quantity,
            itemsPerUnit: supply.itemsPerUnit,
            daysOfWeekRepeat,
          }) && (
            <Text mt={1} fontSize="sm" color="gray.400" fontWeight="bold">
              <strong>Estimated end:</strong>{" "}
              {format(
                calculateEstimatedEndDate({
                  quantity: supply.quantity,
                  itemsPerUnit: supply.itemsPerUnit,
                  daysOfWeekRepeat,
                })!,
                "dd.MM.yyyy"
              )}
            </Text>
          )}
          {supply.lastRefillDate && (
            <Text fontSize="sm" color="gray.600">
              Last refill: {format(new Date(supply.lastRefillDate), "dd.MM.yyyy")}
            </Text>
          )}
        </Box>
      ) : (
        <Text fontSize="sm" color="gray.600">
          Track quantity and when supply runs out (medicine, consumables, etc.)
        </Text>
      )}
    </Box>
  );
};

export default SupplySection;
