import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Checkbox,
  Empty,
} from "antd";
import { useState } from "react";
import { RcFile } from "antd/es/upload";
import styles from "./modal-form.module.scss";
import Icons from "@/themes/images/icons/icons";

import { SearchOutlined} from "@ant-design/icons";

/**
 * Interface for defining a single form field's properties.
 */
interface FormField {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "textarea" | "image" | "checkboxSelect";
  required?: boolean;
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  isExtended?: boolean;
  readonly?: boolean;
  triggerElement?: React.ReactNode;
}

/**
 * Interface for defining a row of form fields.
 */
export interface FormRow {
  fields: [FormField, FormField?];
}

/**
 * Props interface for the ModalFormComponent.
 */
interface ModalFormProps {
  isVisible: boolean;
  title: string;
  formRows: FormRow[];
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onPrimaryClick?: (values: Record<string, any>) => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
  initialValues?: Record<string, any>;
  formErrors?: Record<string, any>;
  children?: React.ReactNode;
  classForm?:string;
}

const ModalFormComponent: React.FC<ModalFormProps> = ({
  isVisible,
  title,
  formRows,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryClick,
  onSecondaryClick,
  onClose,
  initialValues = {},
  formErrors,
  children,
  classForm,
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialValues?.image || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const projectName = initialValues.projectName || "Project";
  const [isSearching, setIsSearching] = useState(false);


  /**
   * Handles form submission by validating fields and triggering the onPrimaryClick callback.
   */
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (imageFile) {
        // Replace the filename with the actual File object
        values.project_logo = imageFile;
      }
      onPrimaryClick?.(values);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  /**
   * Resets the form fields and triggers the onClose callback.
   */
  const handleClose = () => {
    form.resetFields();
    setImageFile(null);
    onClose?.();
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            placeholder={field.placeholder}
            options={field.options}
            disabled={field.readonly}
            suffixIcon={isSearching ? <SearchOutlined /> :  Icons.arrowDownOutline}
            showSearch
            value={
              field.options?.some(
                (option) => option.value === form.getFieldValue(field.name)
              )
                ? form.getFieldValue(field.name)
                : undefined
            }
          />
        );
      case "checkboxSelect":
        return (
          <Select
          mode="multiple"
          className={styles.multipleSelect}
          placeholder={field.placeholder || "Select options"}
          disabled={field.readonly}
          options={field.options}
          value={form.getFieldValue(field.name) || []}
          onChange={(selectedValues) => {
            form.setFieldValue(field.name, selectedValues);
          }}
          onSearch={(val) => setIsSearching(val.length > 0)}
          onBlur={() => setIsSearching(false)}
          suffixIcon={isSearching ? <SearchOutlined /> :  Icons.arrowDownOutline}
          maxTagCount={1}
          dropdownRender={(menu) => {
            const currentValue = form.getFieldValue(field.name) || [];
    
            if (!field.options || field.options.length === 0) {
              return (
                <Empty
                  style={{ padding: "0px" }}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Data"
                />
              );
            }
    
            return (
              <div>
                {field.options?.map((option) => {
                  const isSelected = currentValue.some(
                    (item :any) =>
                      item.id === option.value || // Object format
                      item === option.value // Direct value format
                  );
    
                  return (
                    <div
                      key={option.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 10px",
                      }}
                    >
                      <Checkbox
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          let newValue;
    
                          if (isChecked) {
                            const isObjectFormat =
                              currentValue.length > 0 &&
                              typeof currentValue[0] === "object";
    
                            newValue = isObjectFormat
                              ? [...currentValue, { id: option.value, name: option.label }]
                              : [...currentValue, option.value];
                          } else {
                            newValue = currentValue.filter((val : any) =>
                              typeof val === "object"
                                ? val.id !== option.value
                                : val !== option.value
                            );
                          }
    
                          form.setFieldValue(field.name, newValue);
                        }}
                      />
                      <span style={{ marginLeft: "8px" }}>{option.label}</span>
                    </div>
                  );
                })}
              </div>
            );
          }}
          
        />
        );

      case "date":
        return (
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder={field.placeholder || "dd/mm/yyyy"}
            suffixIcon={Icons.calender}
          />
        );
      case "textarea":
        return (
          <Input.TextArea
            placeholder={field.placeholder}
            rows={8}
            readOnly={field.readonly}
            className={styles.textarea}
          />
        );
      case "image":
        return (
          <div className={styles.imageUploadContainer}>
            <div className={styles.imageCircle}>
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className={styles.image} />
              ) : (
                <span className={styles.imageInitial}>
                  {projectName[0].toUpperCase()}
                </span>
              )}
            </div>
            <Upload
              showUploadList={false}
              beforeUpload={(file: RcFile) => {
                // Convert the image to a base64 string for form submission
                const previewUrl = URL.createObjectURL(file);
                setImageUrl(previewUrl);

                // Store the actual file object
                setImageFile(file);

                // Set a placeholder value in form
                form.setFieldValue(field.name, file.name);

                return false;
              }}
              accept="image/*"
            >
              {field.triggerElement || (
                <a href="#" className={styles.changeImageLink}>
                  Project logo
                </a>
              )}
            </Upload>
          </div>
        );
      default:
        return (
          <Input placeholder={field.placeholder} readOnly={field.readonly} />
        );
    }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      className={styles.customModal}
    >
      <div className={`${styles.title}`}>{title}</div>
      {children && <div className={styles.modalChildren}>{children}</div>}
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        requiredMark={false}
        className={`${styles.formContent} ${classForm}`}
      >
        {formRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`${styles.formRow} ${
              row.fields.length === 1 ? styles.singleField : styles.multiField
            }`}
          >
            {row.fields.map(
              (field, fieldIndex) =>
                field && (
                  <div
                    key={field.name}
                    className={`${styles.formField} ${
                      field.isExtended ? styles.extendedField : ""
                    }`}
                  >
                    <Form.Item
                      name={field.name}
                      rules={
                        field.required
                          ? [
                              {
                                required: true,
                                message: `Please input ${field.label}!`,
                              },
                            ]
                          : []
                      }
                      label={
                        field.type === "image" ? null : (
                          <>
                            {field.label}{" "}
                            {field.required && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </>
                        )
                      }
                      style={field.type === "image" ? { marginBottom: 0 } : {}}
                      help={formErrors?.[field.name]} // Dynamically render the error message
                      validateStatus={
                        formErrors?.[field.name] ? "error" : undefined
                      }
                    >
                      {renderField(field)}
                    </Form.Item>
                  </div>
                )
            )}
          </div>
        ))}
      </Form>

      <div className={styles.buttonsContainer}>
        <button
          onClick={onSecondaryClick || handleClose}
          className={styles.secondaryButton}
        >
          {secondaryButtonLabel}
        </button>
        <button onClick={handleSubmit} className={styles.primaryButton}>
          {primaryButtonLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ModalFormComponent;
