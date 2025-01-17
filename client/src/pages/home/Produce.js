import { Button, Input, Select } from "antd";
import Default from "../../Layouts/Default";
import { DownOutlined } from "@ant-design/icons";
import { useProductLineContext } from "../../contexts/ProductLineContext";
import { useState } from "react";
import { createProduct } from "../../api/product";
import { useAppContext } from "../../contexts/AppContext";
function Produce() {
  const { Option, OptGroup } = Select;
  const [formData, setFormData] = useState({});

  const {
    productlineState: { listProductLine },
  } = useProductLineContext();

  const { openNotification } = useAppContext();

  const onValueChange = (e) => {
    const propName = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [propName]: Number(value) });
    console.log(formData);
  };

  const onSelectChange = (value) => {
    setFormData({ ...formData, id: value });
  };

  const handleSubmit = async () => {
    const response = await createProduct(formData);
    if (response.success) {
      openNotification("success", response.msg);
    }
  };

  return (
    <div class="w-full">
      <Default tagName="sx">
        <div className="w-full h-full">
          <div className="mx-auto mt-5 text-3xl text-inherit text-orange-600">
            {" "}
            Đơn sản xuất
          </div>
          <div className="w-1/2 mt-20 mx-auto flex flex-col space-y-10">
            <div className="flex flex-row space-x-10">
              <div className="w-1/3 text-xl text-right"> Dòng sản phẩm :</div>
              <div className="w-2/3">
                <Select
                
                  defaultValue="Chọn dòng sản phẩm"
                  style={{
                    width: 200,
                  }}
                  onChange={onSelectChange}
                  status="warning">
                  {listProductLine.map((productline, index) => {
                    return (
                      <Option value={productline._id}>
                        {productline.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="flex flex-row space-x-10">
              <div className="w-1/3 text-xl text-right">Số lượng : </div>
              <div className="w-2/3">
                <Input
                  name="amount"
                  type="number"
                  onChange={onValueChange}
                  style={{
                    width: 200,
                  }}></Input>
              </div>
            </div>
            <div className="mt-20">
              <Button className="block mr-0 ml-auto" onClick={handleSubmit}>
                Sản xuất
              </Button>
            </div>
          </div>
        </div>
      </Default>
    </div>
  );
}

export default Produce;
