import { Image, Descriptions, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getProductLine } from "../../api/productline";
import ProductLineEdit from "./EditProductLine";
import ProductLineDelete from "./DeleteProductLine";

const ProductLineDetail = (props) => {
  const { id } = props;
  const navigate = useNavigate();
  const [productLine, setProductLine] = useState({});
  const [visible, setVisible] = useState(false);
  const loadProductLine = async (id) => {
    const response = await getProductLine(id);
    console.log(response.data);
    if (response.success) {
      setProductLine(response.data);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setVisible(true);
  };

  useEffect(() => {
    loadProductLine(id);
  }, [id]);

  return (
    <div>
      <Image src={productLine.img} width={400} preview={false} />
      <div className="text-right text-2xl text-cyan-500">
        <EditOutlined
          onClick={() => {
            navigate(`/productline/${id}/edit`);
          }}
        />
        <DeleteOutlined onClick={handleDelete} />
      </div>
      <Descriptions title="Thông tin chi tiết" bordered column={1}>
        <Descriptions.Item label="Tên dòng xe">
          {productLine.name}
        </Descriptions.Item>
        <Descriptions.Item label="Khối lượng bản thân">
          {productLine.weight}
        </Descriptions.Item>
        <Descriptions.Item label="Dài">{productLine.length}</Descriptions.Item>
        <Descriptions.Item label="Rộng">{productLine.width}</Descriptions.Item>
        <Descriptions.Item label="Cao">{productLine.height}</Descriptions.Item>
        <Descriptions.Item label="Khoảng cách trục bánh xe">
          {productLine.wheelAxleDistance}
        </Descriptions.Item>
        <Descriptions.Item label="Chiều cao yên xe">
          {productLine.saddleHeight}
        </Descriptions.Item>
        <Descriptions.Item label="Khoảng cách gầm xe">
          {productLine.groundClearance}
        </Descriptions.Item>
        <Descriptions.Item label="Dung tích bình xăng">
          {productLine.petrolTankCapacity}
        </Descriptions.Item>
        <Descriptions.Item label="Mức tiêu thụ nhiên liệu">
          {productLine.fuelConsumption}
        </Descriptions.Item>
        <Descriptions.Item label="Dung tích xy-lanh">
          {productLine.displacementVolume}
        </Descriptions.Item>
        <Descriptions.Item label="Loại động cơ">
          {productLine.engineType}
        </Descriptions.Item>
      </Descriptions>
      <ProductLineDelete
        id={id}
        handleCancel={handleCancel}
        isVisible={visible}
      />
    </div>
  );
};

export default ProductLineDetail;
