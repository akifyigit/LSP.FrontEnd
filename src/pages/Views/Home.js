import React, { useEffect, useState } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Space from 'antd/lib/space';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import {
  Alert,
  Badge,
  BreadCrumb,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Collapse,
  CollapseItem,
  DatePicker,
  Divider,
  DraggableTabPane,
  Dropdown,
  IconButton,
  Input,
  Modal,
  RadioButton,
  RadioCheck,
  Range,
  SearchableSelectBox,
  SelectBox,
  Skeleton,
  Spinner,
  Stepper,
  Subtitle,
  Text,
  TextAlt,
  TextArea,
  Tiny,
  Toggle,
  Tooltip,
  TreeTransfer,
  Upload,
  WarningText,
} from 'components';
import { EditorState } from 'draft-js';
import Main from 'pages/Layout/Main';
import LottieSpinner from 'pages/Layout/Spinner/LottieSpinner';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Editor } from 'react-draft-wysiwyg';
import {
  dateToEpoch,
  epochToDate,
  epochToDateString,
} from 'utils/dateFormatters';

const stepperData = [
  {
    icon: <i className="fa-solid text-primary fa-user"></i>,
    title: 'Kişisel Bilgiler',
  },
  {
    icon: <i className="fa-solid text-primary fa-building"></i>,
    title: 'Şirket Bilgileri',
  },
  {
    icon: <i className="fa-solid text-primary fa-map-location-dot"></i>,
    title: 'Adres Bilgileri',
  },
];

const Home = () => {
  const [state, setState] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState('ssssssssssss');
  const [selectState, setSelectState] = useState({});
  const [checkBoxState, setCheckBoxState] = useState(false);
  const [checkBoxState2, setCheckBoxState2] = useState(false);
  const [radioButtonState, setRadioButtonState] = useState('0');
  const [searchableSelectBoxState, setSearchableSelectBoxState] = useState('');
  const [searchableSelectBoxItems, setSearchableSelectBoxItems] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [startDate, setStartDate] = useState(epochToDate(1658386975968));
  const [treeSources, setTreeSources] = useState([
    {
      id: '1',
      label: 'field 1',
      childrens: [
        { id: '1a', label: 'subfield 1a' },
        { id: '1b', label: 'subfield 1b' },
        { id: '1c', label: 'subfield 1c' },
      ],
    },
    {
      id: '2',
      label: 'field 2',
      childrens: [
        { id: '2d', label: 'subfield 2d' },
        { id: '2e', label: 'subfield 2e' },
        { id: '2f', label: 'subfield 2f' },
      ],
    },
    {
      id: '3',
      label: 'field 3',
      childrens: [
        { id: '3a', label: 'subfield 3a' },
        { id: '3b', label: 'subfield 3b' },
        { id: '3c', label: 'subfield 3c' },
      ],
    },
    {
      id: '4',
      label: 'field 4',
      childrens: [
        { id: '4a', label: 'subfield 4a' },
        { id: '4b', label: 'subfield 4b' },
        { id: '4c', label: 'subfield 4c' },
      ],
    },
    {
      id: '5',
      label: 'field 5',
      childrens: [
        { id: '5a', label: 'subfield 5a' },
        { id: '5b', label: 'subfield 5b' },
        { id: '5c', label: 'subfield 5c' },
      ],
    },
    { id: '6', label: 'field 6' },
    { id: '7', label: 'field 7' },
    { id: '8', label: 'field 8' },
    { id: '9', label: 'field 9' },
    { id: '10', label: 'field 10' },
    { id: '11', label: 'sub den' },
  ]);
  const [treeTargets, setTreeTargets] = useState([
    {
      id: '1',
      label: 'field 1',
      childrens: [{ id: '1a', label: 'subfield 1a' }],
    },
    {
      id: '2',
      label: 'field 2',
      childrens: [
        { id: '2e', label: 'subfield 2e' },
        { id: '2f', label: 'subfield 2f' },
      ],
    },
    {
      id: '3',
      label: 'field 3',
      childrens: [
        { id: '3a', label: 'subfield 3a' },
        { id: '3c', label: 'subfield 3c' },
      ],
    },
  ]);

  const handleTreeOnChange = (columns) => {
    setTreeSources(columns.sources);
    setTreeTargets(columns.targets);
  };

  useEffect(() => {
    if (searchableSelectBoxState !== '') {
      //axios api request with searchableSelectBoxState
      //and update searchableSelectBoxItems
      setSearchableSelectBoxItems([
        {
          value: 0,
          leftIcon: <span />,
          label: 'Turkey',
          rightIcon: <span />,
        },
        {
          value: 1,
          leftIcon: <span />,
          label: 'Tannu Tuva',
          rightIcon: <span />,
        },
      ]);
    }
  }, [searchableSelectBoxState]);

  const handleSelect = (item) => {
    setSearchableSelectBoxState(item.label);
  };

  console.log(selectedFile);

  const selectBar = {
    leftIcon: <i className="fa-solid fa-building-user"></i>,
    text: <Tiny>plac2e holder</Tiny>,
    rightIcon: <i className="fa-solid fa-chevron-down"></i>,
  };

  const items = [
    {
      value: 1,
      label: 'tests12312',
    },
    {
      value: 2,
      label: 'test333s',
    },
    {
      value: 3,
      label: 'tests123',
    },
    {
      value: 4,
      label: 'tests1',
    },

    {
      value: 5,
      label: 'tests',
    },
  ];

  const dropdownItems = [
    {
      leftIcon: <i className="fa-solid fa-building-user"></i>,
      label: 'item 1',
      onClick: () => {
        console.log(1);
      },
    },
    {
      leftIcon: <i className="fa-solid fa-building-user"></i>,
      label: 'item 2',
      onClick: () => {
        console.log(2);
      },
    },
    {
      leftIcon: <i className="fa-solid fa-building-user"></i>,
      label: 'item 3',
      onClick: () => {
        console.log(3);
      },
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';

            if (tag === 'loser') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <Main>
      <LottieSpinner isPending={true} />
      <TreeTransfer
        wrapperClassName="border border-primary w-fit p-5"
        sources={treeSources}
        targets={treeTargets}
        onChange={handleTreeOnChange}
        sourcesTitle="Seçilebilir Alanlar"
        targetsTitle="Seçilen Alanlar"
      />
      <br />
      <br />
      <WarningText text="BU BİR BAŞARISIZ METNİDİR" textType="error" />
      <WarningText text="BU BİR BAŞARILI METNİDİR" textType="success" />
      <WarningText text="BU BİR BİLGİ METNİDİR" textType="info" />
      <WarningText text="BU BİR UYARI METNİDİR" textType="warning" />
      <Upload onChange={(val) => setSelectedFile(val)} />
      <Spinner isPending={isPending} />
      <Button onClick={() => setIsPending(true)} text="Call Spinner" />
      <Stepper activeStep={2} steps={stepperData} />
      <TextArea
        label="Hello"
        id="textarea"
        maxLength={100}
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      />
      <Button
        text="Submit"
        leftIcon={<i className="fa-brands fa-bitcoin text-primary" />}
        rightIcon={<i className="fa-brands fa-bitcoin text-primary" />}
        onClick={() => setShowAlert(!showAlert)}
      />

      <BreadCrumb
        items={{
          label: 'HomePage',
          route: '/',
          children: {
            label: 'sipariş',
            route: '/order',
            children: {
              label: 'Mehmet sipariş',
              route: '/order/21312312312',
              children: null,
            },
          },
        }}
      />

      <Range minimumvalue={0} maximumvalue={66} HeaderOfRange={'Paycheck'} />
      <Button
        className="mt-2"
        text="Show Modal"
        onClick={() => setShowModal(!showModal)}
      />
      <Tooltip
        textForTip="Tooltip"
        tooltipClassname="bg-primary text-white"
        location="bottom"
      >
        <Button className="mt-2" text="tooltip button" />
      </Tooltip>
      <RadioButton
        id={'radio1'}
        GroupName={'1'}
        label={'hello'}
        ButtonClassName={''}
        inputClassname={''}
        labelside={'left'}
      />
      <RadioButton
        id={'radio2'}
        GroupName={'1'}
        label={'hello'}
        ButtonClassName={''}
        inputClassname={''}
        labelside={'right'}
      />
      <div className="flex items-end border border-default-border rounded gap-x-2 p-3 my-3">
        <Button
          className="mt-2"
          text="DateToEpoch"
          onClick={() => console.log(dateToEpoch(startDate))}
        />
        <Button
          className="mt-2"
          text="EpochToDate"
          onClick={() => console.log(epochToDate(dateToEpoch(startDate)))}
        />
        <Button
          className="mt-2"
          text="EpochToDateString"
          onClick={() => console.log(epochToDateString(dateToEpoch(startDate)))}
        />
        <DatePicker
          label="Başlangıç Tarihi"
          id="startDate"
          value={startDate}
          onChange={(date) => {
            date !== null ? setStartDate(date) : setStartDate('');
          }}
        />
        <Input
          label="login"
          id="login"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <Alert
        message="Something Went wrong"
        position=""
        status="warning"
        duration={5000}
        showAlert={showAlert}
      />
      <Dropdown
        className="z-20 mt-3"
        items={dropdownItems}
        dropdownBarLeftIcon={<i className="fa-solid fa-user"></i>}
        dropdownBarText="Mehmet Akif Yiğit"
      />
      <Table columns={columns} dataSource={data} />
      <DndProvider backend={HTML5Backend}>
        <DraggableTabPane
          defaultActiveTabPaneIndex={0}
          tabPaneList={[
            {
              key: 0,
              tabPaneComponent: <Text> Hello Home</Text>,
              title: 'Home',
            },
            {
              key: 1,
              tabPaneComponent: <Text> About</Text>,
              title: 'About',
            },
          ]}
        />
      </DndProvider>

      <IconButton
        className="inline-flex items-center border p-3 rounded-full border-green-lighter hover:bg-green-light hover:text-sky-light"
        icon={<i className="fa-solid fa-bell" />}
        onClick={() => {
          console.log('Icon Button Clicked.');
        }}
      />
      <br />
      <br />
      <Badge
        className="bg-red-lighter"
        icon={<i className="fa-solid fa-clock-rotate-left" />}
        text="badge"
      />
      <br />
      <Badge
        className="bg-primary-lighter"
        icon={<i className="fa-solid fa-clock-rotate-left" />}
        text={<Tiny>badge</Tiny>}
      />
      <br />
      <Divider text="center divider" />
      <Divider text="left divider" align="left" />
      <Divider text="right divider" align="right" />
      <Divider
        className="pb-0 pt-1"
        text={
          <Badge
            className="bg-yellow-lighter"
            icon={<i className="fa-solid fa-divide" />}
            text={<Tiny>Divider with Badge</Tiny>}
          />
        }
        align="center"
      />

      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="border-l border-b border-r px-2 pb-2 border-default-border"
        toolbarClassName="toolbar-class"
        editorState={editorState}
        onEditorStateChange={(e) => {
          setEditorState(e);
        }}
        toolbar={{
          options: [
            'history',
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'embedded',
            'textAlign',
            'colorPicker',
            'link',
          ],
          history: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['undo', 'redo'],
          },
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'monospace',
              'superscript',
              'subscript',
            ],
          },
          blockType: {
            inDropdown: true,
            options: [
              'Normal',
              'H1',
              'H2',
              'H3',
              'H4',
              'H5',
              'H6',
              'Blockquote',
              'Code',
            ],

            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          embedded: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            embedCallback: undefined,
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
          image: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: false,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
          fontFamily: {
            options: [
              'Arial',
              'Georgia',
              'Impact',
              'Tahoma',
              'Times New Roman',
              'Verdana',
            ],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: true,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['left', 'center', 'right', 'justify'],
          },
          link: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link', 'unlink'],

            linkCallback: undefined,
          },
        }}
      />

      <Divider
        text={
          <Badge
            className="bg-yellow-lighter"
            icon={<i className="fa-solid fa-divide" />}
            text={<Tiny>Divider with Badge</Tiny>}
          />
        }
        align="center"
      />
      <Button
        className="mt-2"
        text="Button with Badge"
        rightIcon={
          <Badge
            className="bg-green-lightest"
            icon={<i className="fa-solid fa-clock-rotate-left" />}
            text={<Tiny>badge</Tiny>}
          />
        }
      />
      <br />
      <SearchableSelectBox
        className="z-10"
        inputValue={searchableSelectBoxState}
        placeholder="Country"
        onChange={setSearchableSelectBoxState}
        onSelect={handleSelect}
        label="Country"
        items={searchableSelectBoxItems}
        isLoading={false}
      />
      <br />
      <SelectBox
        className="z-9"
        label="department"
        id="department"
        value={selectState}
        onChange={(val) => setSelectState(val)}
        selectBar={selectBar}
        items={items}
      />
      <Toggle />
      <Card>
        <CardHeader className="justify-between items-center">
          <TextAlt className="">June 24, 2022</TextAlt>
          <Button
            className="w-40 border-primary-light"
            text="Read More..."
          ></Button>
        </CardHeader>
        <CardContent className="flex-col md:flex-row gap-y-4 md:gap-y-0 items-center space-x-5">
          <img
            className="rounded-lg"
            src="https://media-exp2.licdn.com/dms/image/C4D03AQEGsLd8UksO6Q/profile-displayphoto-shrink_200_200/0/1614381554929?e=1661385600&v=beta&t=karEr52TmUGR-79jG0_VArpKZltXqtM8A4ixOqO3BM0"
            alt="Mehmet Akif Yiğit"
          />
          <Subtitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            nobis neque nemo incidunt inventore officiis id quas suscipit
            provident! Adipisci vitae itaque culpa obcaecati velit odio aut
            sequi consequuntur quo? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quia nulla, expedita obcaecati nam et minima est
            nostrum, cum iusto qui, assumenda nisi? Doloribus similique ea
            aperiam reprehenderit tempore reiciendis cumque! Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Nobis, officia tempore
            dolores ipsa consequatur expedita eaque ex odit repellendus
            consectetur saepe similique eos iste ipsum hic non provident libero
            quae.
          </Subtitle>
        </CardContent>
        <CardFooter className="justify-end">
          <Tiny>Mehmet Akif Yiğit</Tiny>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="w-full justify-between items-end">
          <Skeleton.SkeletonLine className="w-24 h-6" />
          <Skeleton.SkeletonSquare className="w-40 h-10 rounded-lg" />
        </CardHeader>
        <CardContent className=" flex-col md:flex-row gap-y-4 md:gap-y-0 items-center space-x-5">
          <Skeleton.SkeletonSquare className=" w-64 h-52 rounded-lg " />
          <div className="w-full h-full m-0 pr-5">
            <Skeleton.SkeletonLine className="h-2" />
            <Skeleton.SkeletonLine className="h-2" />
            <Skeleton.SkeletonLine className="h-2" />
            <Skeleton.SkeletonLine className="h-2" />
            <Skeleton.SkeletonLine className="h-2" />
            <Skeleton.SkeletonLine className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Skeleton.SkeletonCircle className="w-20 h-4" />
        </CardFooter>
      </Card>

      <RadioCheck
        id="development1"
        headerLabel="Programming Languages"
        label="JavaScript"
        type="checkbox"
        checked={checkBoxState}
        onChange={() => setCheckBoxState(!checkBoxState)}
      />
      <RadioCheck
        id="development2"
        label="Python"
        labelPlacement="left"
        type="checkbox"
        checked={checkBoxState}
        onChange={() => setCheckBoxState(!checkBoxState)}
      />
      <RadioCheck
        id="development3"
        label="C#"
        type="checkbox"
        checked={checkBoxState2}
        disabled={true}
        onChange={() => setCheckBoxState2(!checkBoxState2)}
      />
      <RadioCheck
        id="development4"
        type="checkbox"
        checked={checkBoxState2}
        onChange={() => setCheckBoxState2(!checkBoxState2)}
      />
      <RadioCheck
        headerLabel="Experience"
        id="development5"
        label="0-1 Year"
        value="0"
        type="radio"
        checked={radioButtonState === '0'}
        onChange={(e) => setRadioButtonState(e.target.value)}
      />
      <RadioCheck
        id="development6"
        label="1-3 Year"
        value="1"
        type="radio"
        labelPlacement="left"
        checked={radioButtonState === '1'}
        onChange={(e) => setRadioButtonState(e.target.value)}
      />
      <RadioCheck
        id="development7"
        label="3-5 Year"
        value="2"
        type="radio"
        checked={radioButtonState === '2'}
        onChange={(e) => setRadioButtonState(e.target.value)}
      />
      <RadioCheck
        id="development8"
        label="5-7 Year"
        value="3"
        type="radio"
        checked={radioButtonState === '3'}
        onChange={(e) => setRadioButtonState(e.target.value)}
        disabled={true}
      />
      <Collapse className="my-5">
        <CollapseItem
          className=""
          collapseBarClassName=""
          collapseContentClassName=""
          collapseBar={<Text>Collapse Item 1</Text>}
          isIconOnClick={false}
          collapsable={true}
          collapseContent={
            <Subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              nobis neque nemo incidunt inventore officiis id quas suscipit
              provident! Adipisci vitae itaque culpa obcaecati velit odio aut
              sequi consequuntur quo? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quia nulla, expedita obcaecati nam et minima est
              nostrum, cum iusto qui, assumenda nisi? Doloribus similique ea
              aperiam reprehenderit tempore reiciendis cumque! Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Nobis, officia tempore
              dolores ipsa consequatur expedita eaque ex odit repellendus
              consectetur saepe similique eos iste ipsum hic non provident
              libero quae.
            </Subtitle>
          }
        />
        <CollapseItem
          className=""
          collapseBarClassName=""
          collapseContentClassName=""
          collapseBar={<Text>Collapse Item 2</Text>}
          isIconOnClick={true}
          collapsable={true}
          collapseContent={
            <Subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              nobis neque nemo incidunt inventore officiis id quas suscipit
              provident! Adipisci vitae itaque culpa obcaecati velit odio aut
              sequi consequuntur quo? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quia nulla, expedita obcaecati nam et minima est
              nostrum, cum iusto qui, assumenda nisi? Doloribus similique ea
              aperiam reprehenderit tempore reiciendis cumque! Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Nobis, officia tempore
              dolores ipsa consequatur expedita eaque ex odit repellendus
              consectetur saepe similique eos iste ipsum hic non provident
              libero quae.
            </Subtitle>
          }
        />
        <CollapseItem
          className=""
          collapseBarClassName=""
          collapseContentClassName=""
          collapseBar={<Text>Collapse Item 3</Text>}
          isIconOnClick={true}
          collapsable={false}
          collapseContent={
            <Tiny>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              nobis neque nemo incidunt inventore officiis id quas suscipit
              provident! Adipisci vitae itaque culpa obcaecati velit odio aut
              sequi consequuntur quo? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quia nulla, expedita obcaecati nam et minima est
              nostrum, cum iusto qui, assumenda nisi? Doloribus similique ea
              aperiam reprehenderit tempore reiciendis cumque! Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Nobis, officia tempore
              dolores ipsa consequatur expedita eaque ex odit repellendus
              consectetur saepe similique eos iste ipsum hic non provident
              libero quae.
            </Tiny>
          }
        />
      </Collapse>
      <Modal isOpen={showModal} handleModalClose={() => setShowModal(false)}>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </Modal>
    </Main>
  );
};

export default Home;
