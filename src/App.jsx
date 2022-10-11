import React, { useEffect } from "react";
import axios from "axios";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { RadioButton } from 'primereact/radiobutton';
import './demo.css';
export function App() {

    // estado para guardar los datos
    const [displayBasic, setDisplayBasic] = React.useState(false);
    const [datos, setDatos] = React.useState([]);

    //https://www.youtube.com/watch?v=irxE1ejuV9s

    const [id_cliente, setId_cliente] = React.useState(0);
    const [nro_doc_ident, setNro_doc_ident] = React.useState("");
    const [nombres, setNombres] = React.useState("");
    const [apellidos, setApellidos] = React.useState("");
    const [direccion, setDireccion] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [genero, setGenero] = React.useState("FEMENINO");
    const [tipo_persona, setTipo_persona] = React.useState("JURIDICA");
    const [activarEdit, setActivarEdit] = React.useState(false);

    // se usa para cargar al iniciar el componente
    useEffect(() => {
        cargarDatos();
    }, [])

    // llamar al api para ser usado y imprimir por consola
    const cargarDatos = async () => {
        const respuesta = await axios.get("http://200.48.129.163/SicomerciV3.api/maestros/v1/cliente/buscar")
        // console.log(respuesta.data);

        setDatos(respuesta.data.response.data);
    }
    // guardar
    const agregarAlumno = async (e) => {
        e.preventDefault();

        if (id_cliente > 0) {

            await axios.post("http://200.48.129.163/SicomerciV3.api/maestros/v1/cliente/actualizar", {
                id_cliente,
                nro_doc_ident,
                nombres,
                apellidos,
                direccion,
                telefono,
                email,
                genero,
                tipo_persona,
                usuario

            });
            alert("Registro actualizado");
            setDisplayBasic(false)
            setId_cliente(0);
            setNro_doc_ident("");
            setNombres("");
            setApellidos("");
            setDireccion("");
            setEmail("");
            setGenero("");
            setTipo_persona("");
            setTelefono("");
        } else {


            let rpt = await axios.post("http://200.48.129.163/SicomerciV3.api/maestros/v1/cliente/insertar", {
                id_cliente,
                nro_doc_ident,
                nombres,
                apellidos,
                direccion,
                telefono,
                email,
                genero,
                tipo_persona,
                usuario
            });

            console.log(rpt);
            if (rpt.data.error == null) {
                alert("Registro exitoso")
            } else {
                alert("error" + rpt.data.error.message);
            }
            setDisplayBasic(false)
        }

        cargarDatos();
    }

    // setear valores
    const activarModificacion = (id, fila) => {

        console.log(fila);
        setId_cliente(fila.id_cliente);
        setNro_doc_ident(fila.nro_doc_ident);
        setNombres(fila.nombres);
        setApellidos(fila.apellidos);
        setTipo_persona(fila.tipo_persona);
        setGenero(fila.genero);
        setDireccion(fila.direccion);
        setTelefono(fila.telefono);
        setEmail(fila.email);

        setActivarEdit(true);
    }

    const htmlOptions = (fila) => {
        console.log(fila)
        return (
            <>
                <div className="text-center">

                    <Button className="pi pi-check-square p-button-sm p-button-info" onClick={() => onClick('displayBasic', activarModificacion(fila.id_cliente, fila))} style={{ 'fontSize': '0.8em' }}></Button>

                </div>
            </>
        )
    }

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,

    }

    const onClick = (name, position) => {

        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    return (
        <>
            <div className="container">
                <div>
                    <h1 className="text-center"> Api con Axios</h1>

                    <div className="row" >

                        <div>

                            <h1>Listado </h1>

                            <div className="datatable-doc-demo">


                                <Button label="Registrar" className="p-button-info p-button-sm" icon="pi pi-plus " onClick={() => onClick('displayBasic')} />
                                <Dialog header={id_cliente > 0 ? "Editar Registro" : "Nuevo Registro"} visible={displayBasic} onHide={() => setDisplayBasic(false)} style={{ width: '30vw' }}>
                                    <div className="row">

                                        <div className="col-6 ml-2 card">

                                            <label className="m-2" htmlFor="in">ID : {id_cliente}</label>

                                        </div>
                                        <div className="col-12 mt-1">
                                            <h5 htmlFor="in">Tipo de persona</h5>

                                            <span className="mr-8">

                                                <RadioButton className="ml-2" name="tipo_per" value={"NATURAL"}
                                                    onChange={(e) => setTipo_persona(e.target.value)} checked={tipo_persona === "NATURAL"} />
                                                <label className="ml-4" >Natural</label>
                                            </span>
                                            <span>

                                                <RadioButton name="tipo_per" value={"JURIDICA"}
                                                    onChange={(e) => setTipo_persona(e.target.value)} checked={tipo_persona === "JURIDICA"} />
                                                <label className="ml-2"  >Juridica</label>
                                            </span>

                                        </div>
                                        <div className="col-12 p-fluid" >
                                            <h5 htmlFor="in">Nro documento de indentidad</h5>

                                            <InputText className="p-inputtext-sm block mb-2" id="in" value={nro_doc_ident} onChange={(e) => setNro_doc_ident(e.target.value)} />

                                        </div>

                                        <div className="col-md-6 p-fluid">
                                            <div>
                                                <h5>Nombres</h5>
                                                <InputText className="p-inputtext-sm block mb-2" value={nombres} onChange={(e) => setNombres(e.target.value)} />

                                            </div>
                                        </div>
                                        <div className="col-md-6 p-fluid">
                                            <div >
                                                <h5>Apellidos</h5>
                                                <InputText className="p-inputtext-sm block mb-2" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />

                                            </div>
                                        </div>

                                        <div className="col-md-12 mt-2">

                                            <h5 htmlFor="in">Genero</h5>
                                            <span className="mr-8">
                                                <RadioButton className="ml-2" name="gener" value={"MASCULINO"}
                                                    onChange={(e) => setGenero(e.target.value)} checked={genero === "MASCULINO"} />
                                                <label className="ml-2" >Masculino</label>
                                            </span>
                                            <span >
                                                <RadioButton name="gener" value={"FEMENINO"}
                                                    onChange={(e) => setGenero(e.target.value)} checked={genero === "FEMENINO"} />
                                                <label className="ml-2" >Femenino</label>
                                            </span>
                                        </div>

                                        <div className="col-md-6 mt-2 p-fluid">
                                            <h5>Telefono</h5>
                                            <InputText className="p-inputtext-sm block mb-2" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                                        </div>
                                        <div className="col-md-6 mt-2 p-fluid">
                                            <h5>Direccion</h5>
                                            <InputText className="p-inputtext-sm block mb-2" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

                                        </div>
                                        <div className="col-md-12 mt-2 p-fluid">
                                            <h5>Email</h5>
                                            <InputText className="p-inputtext-sm block mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>


                                        <div className="col-md-6 p-fluid mt-3">
                                            {

                                                id_cliente > 0 ?
                                                    <Button label="Guardar" className="p-button-info p-button-sm  justify-content-center" icon="pi pi-save" iconPos="right" onClick={(e) => agregarAlumno(e)} />
                                                    : <Button label="Guardar" className="p-button-info p-button-sm justify-content-center" icon="pi pi-save" iconPos="right" onClick={(e) => agregarAlumno(e)} />

                                            }
                                        </div>
                                        <div className="col-md-6 p-fluid  mt-3">
                                            <Button label="cancelar" className="p-button-secondary p-button-sm justify-content-center" icon="pi pi-times" iconPos="right" onClick={(e) => setDisplayBasic(false)} />
                                        </div>



                                    </div>
                                </Dialog>

                                <DataTable value={datos} paginator className="p-datatable-customers" rows={10}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}
                                    dataKey="IdUsuario" rowHover responsiveLayout="scroll" globalFilterFields={['nombres', 'country.name', 'representative.name', 'balance', 'status']}
                                >
                                    <Column field="id_cliente" header="ID" />

                                    <Column field="nombres" header="Nombres" />
                                    <Column field="email" header="Email" />


                                    <Column header="" body={htmlOptions} />
                                </DataTable>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
