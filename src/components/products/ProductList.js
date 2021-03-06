import React, { Fragment, useState, useContext, useEffect } from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../context/productContext";
import CurrencyInput from "react-currency-input-field";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ProductList = () => {
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "productId",
      responsive: ["md"],
      sorter: (record1, record2) => {
        return record1.productId < record2.productId;
      },
    },
    {
      key: "2",
      title: "Nombre del Producto",
      dataIndex: "productName",
      responsive: ["md"],
    },
    {
      key: "3",
      title: "Caracteristicas",
      dataIndex: "characteristics",
      responsive: ["md"],
    },

    {
      key: "4",
      title: "Fecha lanzamiento",
      dataIndex: "dateLunch",
      responsive: ["md"],
    },
    {
      key: "5",
      title: "Correo fabricante",
      dataIndex: "email",
      responsive: ["md"],
    },
    {
      key: "6",
      title: "Pais de fabricacion",
      dataIndex: "country",
      responsive: ["md"],
    },

    {
      key: "7",
      title: "Precio",
      dataIndex: "price",
      responsive: ["md"],
      sorter: (record1, record2) => {
        return record1.price > record2.price;
      },
      render: (text, record) => (
        <Space size="middle">{formatNumber(record?.price)}</Space>
      ),
    },

    {
      key: "8",
      title: "Unidades disponibles",
      dataIndex: "available",
      width: 25,
      filters: [{ text: "Menos de 10", value: false }],
      onFilter: (value, record1) => {
        return record1.available < 10;
      },
    },
    {
      key: "9",
      title: "Unidades vendidas",
      dataIndex: "sales",
      filters: [{ text: "Mas de 20", value: false }],
      onFilter: (value, record2) => {
        return record2.sales > 20;
      },
    },
    {
      key: "10",
      title: "Imagen",
      dataIndex: "image",
      responsive: ["md"],
      render: (text, record) => (
        <Space size="middle">
          <div>
            <img
              classname="size-image"
              src={`http://localhost:7008/api/products/get-image/${record?.image}`}
            />
          </div>
        </Space>
      ),
    },
    {
      key: "11",
      title: "Acciones",
      dataIndex: "action",
      responsive: ["md"],

      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => selectedProduct(record, "Update")}
            color="btn btn-primary btn-lg btn-block"
          >
            Actualiza
          </Button>

          <Button
            onClick={() => deleteRecord(record)}
            color="btn btn-secondary btn-lg btn-block"
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const authContext = useContext(AuthContext);
  const {
    saveProductsList,
    products,
    deleteProductFromList,
    updateProductFromList,
    countries,
  } = authContext;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [casos, setCase] = useState("New");
  const [dataSource, setDataSource] = useState(products);
  const [modalNew, setModal] = useState(false);
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    characteristics: "",
    dateLunch: "",
    email: "",
    country: "",
    price: "",
    available: "",
    sales: "",
    image: "",
  });
  const [files, setFile] = useState();
  const [pathImage, setPathImage] = useState("");
  const {
    productId,
    productName,
    characteristics,
    dateLunch,
    email,
    country,
    price,
    available,
    sales,
    image,
  } = product;

  useEffect(() => {
    setDataSource(products);
    // eslint-disable-next-line
  }, [products]);

  const showModalNew = () => {
    setModal(true);
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const closeModalNew = () => {
    setModal(false);
    setCase("New");
  };

  const saveProduct = () => {
    if (casos === "New") {
      saveProductsList(product, files);
    }
    if (casos === "Update") {
      updateProductFromList(product, files);
    }

    setProduct({
      productId: "",
      productName: "",
      characteristics: "",
      dateLunch: "",
      email: "",
      country: "",
      price: "",
      available: "",
      sales: "",
      image: null,
    });
    setFile(null);

    setModal(false);
    setCase("New");
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const selectedProduct = (product, caso) => {
    setProduct(product);
    setCase(caso);
    caso === "Update" && setModal(true);
  };

  const deleteRecord = (record) => {
    deleteProductFromList(record._id);
  };

  const handleChangeImage = (e) => {
    if (e.target && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function load() {
          setPathImage(reader.result);
        };
        setFile(file);
      } else {
        console.log("hubo un error con la imagen");
      }
    }
  };

  return (
    <Fragment>
      <div className="contenedor-principal">
        <h1 className="align-center">Listado de Productos</h1>
        <button
          className="btn btn-outline-dark btn-lg padding-button"
          onClick={() => showModalNew()}
        >
          {" "}
          Nuevo
        </button>
        {"  "}
        <Table
          columns={columns}
          key={dataSource.productId}
          dataSource={dataSource}
          rowKey="_id"
          scroll={{ x: 1500 }}
          total={10}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        ></Table>
      </div>
      <Modal isOpen={modalNew}>
        <ModalHeader>
          <div>
            {casos === "New" ? (
              <h3>Nuevo producto</h3>
            ) : (
              <h3>Modificar producto</h3>
            )}
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label htmlFor="productId">ID</label>
            <input
              type="number"
              id="productId"
              name="productId"
              className="form-control"
              value={productId}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="productName">Nombre del producto</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="form-control"
              value={productName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="characteristics">Caracteristicas</label>
            <input
              type="text"
              id="characteristics"
              name="characteristics"
              className="form-control"
              value={characteristics}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="dateLunch">Fecha de Lanzamiento</label>
            <input
              type="Date"
              id="dateLunch"
              name="dateLunch"
              className="form-control"
              value={dateLunch}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Correo Electr??nico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="country">Pais del fabricante</label>
            <select
              className="form-select"
              id="country"
              name="country"
              value={country}
              onChange={handleChange}
            >
              {countries
                ? countries.map((country) => (
                    <option value={country.name}>{country.name}</option>
                  ))
                : null}
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="price">Precio</label>
            <CurrencyInput
              defaultValue={1000}
              decimalsLimit={2}
              value={price}
              className="form-control"
              name="price"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="available">Unidades disponibles</label>
            <input
              type="number"
              id="available"
              name="available"
              className="form-control"
              value={available}
              onChange={handleChange}
            ></input>
          </FormGroup>
          <FormGroup>
            <label htmlFor="sales">Unidades Vendidas</label>
            <input
              type="number"
              id="sales"
              name="sales"
              className="form-control"
              value={sales}
              onChange={handleChange}
            ></input>
          </FormGroup>
          <FormGroup>
            <label htmlFor="image">Imagen</label>
            <input
              type="file"
              className="form-control"
              onChange={handleChangeImage}
            ></input>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            className="padding-button"
            color="primary"
            onClick={() => saveProduct()}
          >
            {" "}
            Guardar{" "}
          </Button>

          <Button
            className="padding-button"
            color="danger"
            onClick={() => closeModalNew()}
          >
            {" "}
            Cancelar{" "}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
export default ProductList;
