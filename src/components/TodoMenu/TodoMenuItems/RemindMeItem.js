import React from 'react';
import { List, Dropdown, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';

export default function RemindMeItem() {
  // const [displayMenu, setDisplayMenu] = useState(null);
  // const [selectingDate, setSelectingDate] = useState(false);

  const id = 'remind_me_item';

  // function onChange(value, dateString) {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  //   setSelectingDate(false);
  // }

  const menu = (
    <Menu>
      <Menu.Item>Today</Menu.Item>
      <Menu.Item>Tomorrow</Menu.Item>
      <Menu.Item>Next Week</Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        {/* <Menu.Item onClick={() => setSelectingDate(true)}> */}
        Pick a Date & Time
      </Menu.Item>
    </Menu>
  );

  // useEffect(() => {
  //   setDisplayMenu(menu);
  // }, []);

  // const timePicker = () => {
  //   return (
  //     <TimePicker use12Hours format="h:mm a" onChange={onChange} open={true} />
  //   );
  // };

  const getRoot = () => {
    return document.getElementById(id);
  };

  return (
    <List.Item id={id}>
      <Dropdown
        overlay={menu}
        placement="bottomLeft"
        arrow
        trigger={['click']}
        getPopupContainer={getRoot}
      >
        {/* {selectingDate ? (
          <DatePicker
            placeholder="Pick a Date & Time"
            bordered={false}
            suffixIcon={null}
            onChange={onChange}
            open={selectingDate}
            getPopupContainer={getRoot}
            renderExtraFooter={timePicker}
          />
        ) : ( */}
        <List.Item.Meta avatar={<BellOutlined />} title="Remind Me" />
        {/* )} */}
      </Dropdown>
    </List.Item>
  );
}
