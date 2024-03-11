import { Segmented } from "antd";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export default function ThemeSwitch() {
  return (
    <Segmented
      size="small"
      options={[
        {
          value: "Light",
          icon: (
            <HiOutlineSun style={{ marginTop: 1, paddingTop: 4 }} size={16} />
          ),
        },
        {
          value: "Dark",
          icon: (
            <HiOutlineMoon style={{ marginTop: 1, paddingTop: 4 }} size={16} />
          ),
        },
      ]}
    />
  );
}
