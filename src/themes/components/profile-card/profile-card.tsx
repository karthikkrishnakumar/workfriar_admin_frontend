import { Form, Input } from "antd";
import styles from "./profile-card.module.scss";

/**
 * Interface for defining a single form field's properties.
 */
interface FormField {
  name: string;
  label: string;
  type: "text" | "image";
  required?: boolean;
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  isExtended?: boolean;
}

/**
 * Interface for defining a row of form fields.
 */
interface FormRow {
  fields: [FormField, FormField?];
}

/**
 * Props interface for the ModalFormComponent.
 */
interface ProfileCardProps {
  formRows: FormRow[];
  initialValues?: Record<string, any>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  formRows,
  initialValues = {},
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      requiredMark={false}
    >
      {formRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`${styles.formRow} ${styles.multiField}`}
        >
          {row.fields.map(
            (field, fieldIndex) =>
              field && (
                <div key={field.name} className={`${styles.formField}`}>
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
                  >
                    <Input placeholder={field.placeholder} readOnly />
                  </Form.Item>
                </div>
              )
          )}
        </div>
      ))}
    </Form>
  );
};

export default ProfileCard;
