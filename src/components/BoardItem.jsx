import { Row, Col, Image, Dropdown, Button } from "react-bootstrap";
import More from '../icons/more-horizontal.svg'
import Progress from "./Progress";
import ArrowRight from "../icons/arrow-right.svg"
import ArrowLeft from "../icons/arrow-left.svg"
import Edit from "../icons/edit.svg"
import Delete from "../icons/bin.svg"
import ArrowRightPrimary from "../icons/arrow-right-primary.svg"
import ArrowLeftPrimary from "../icons/arrow-left-primary.svg"
import EditPrimary from "../icons/edit-primary.svg"
import DeleteDanger from "../icons/bin-danger.svg"
import AlertDanger from "../icons/alert-danger.svg"
import { useState } from "react";
import ModalCustom from "./ModalCustom";

export default function BoardItem({title, progress}){ 
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [settings, setSettings] = useState([
    {
      text: 'Move Right',
      icon: ArrowRight,
      iconAlt: ArrowRightPrimary,
      active: false,
      activeVariant: 'primary',
      onClick: ()=>{console.log('move right')}
    },
    {
      text: 'Move Left',
      icon: ArrowLeft,
      iconAlt: ArrowLeftPrimary,
      active: false,
      activeVariant: 'primary',
      onClick: ()=>{console.log('move right')}
    },
    {
      text: 'Edit',
      icon: Edit,
      iconAlt: EditPrimary,
      active: false,
      activeVariant: 'primary',
      onClick: ()=>{console.log('move right')}
    },
    {
      text: 'Delete',
      icon: Delete,
      iconAlt: DeleteDanger,
      active: false,
      activeVariant: 'danger',
      onClick: ()=>setDeleteModalShow(true)
    },

  ])
  const swapSetting = (id, obj) =>{
    let newSettings = settings.map((setting, i)=>{
      if(id===i){
        return obj
      }
      return setting
    })
    setSettings(newSettings)
  }
  return (
    <div className="board-item">
      <div className="title s-14 font-weight-700">
        {title}
      </div>
      <Row className="align-items-center mt-3">
        <Col>
          <Progress percent={progress}/>
        </Col>
        <Col xs="auto" md="auto">
            {/* <Button variant="transparent" className="p-0">
              
            </Button> */}
          <Dropdown>
            <Dropdown.Toggle variant="transparent" className="p-0">
              <Image src={More} height={24} width={24}/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                settings.map((setting, i)=>(
                  <Dropdown.Item className={`s-14 font-weight-600 py-0 my-2 hover-${setting.activeVariant}` }
                  onClick={(e)=>setting.onClick(e)} 
                  onMouseEnter={()=>{swapSetting(i, {...setting, active: true})}}
                  onMouseLeave={()=>{setSettings(settings.map(setting=>({...setting, active: false})))}}
                  key={i}>
                    <span className="me-2">
                      <Image src={setting.active? setting.iconAlt: setting.icon}/>
                    </span>
                    {setting.text}
                  </Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Modal delete action */}
      <ModalCustom 
        Body={'Are you sure want to delete this task? your action can’t be reverted.'}
        Footer={
          <>
            <Button onClick={()=>setDeleteModalShow(false)} className="me-2 m-0 text-neutral-90 shadow" variant="white">Cancel</Button>
            <Button className="m-0 shadow" variant="danger">Delete</Button>
          </>
        }
        HeaderIcon={AlertDanger}
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title="Delete Task"
        closable
      />
    </div>
  )
}