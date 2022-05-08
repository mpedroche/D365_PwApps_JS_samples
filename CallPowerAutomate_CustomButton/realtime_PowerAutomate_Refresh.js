
async function CallPowerAutomate(primaryControl) {

    //Obtenemos el contexto de ejecución.
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId().replace('{', '').replace('}', '');
    
    //Obtenermos el ID del registro para enviar al Power Automate.
    var data = {
        "recordId": recordId
    };
    
    //Generamos la variables del cuadro de dialogo que se abrirá en caso correcto.
    var alertStrings = { text: "El proceso finalizó correctamente", title: "CORRECTO", confirmButtonLabel: "Ok" };
    var alertOptions = { height: 200, width: 450 };
    //Generamos la variables del cuadro de dialogo que se abrirá en caso de error.
    var alertStringsERROR = { text:"Ocurrió un error, intentelo de nuevo. Si el problema persiste contacte con el administrador", title:"ERROR", confirmButtonLabel:"Aceptar"};
    var alertOptionsERROR = { height: 200, width: 450  };
    Xrm.Utility.showProgressIndicator("Please wait...");
    //Haremos la llamada a nuestro Power Automate.
    try {
        await fetch("PowerAutomateURL",
        {
            "method":"POST",
            "headers": {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        console.log("Flow call finished Ok");
        Xrm.Utility.closeProgressIndicator();
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    
    } catch (error) {
    
    Xrm.Utility.closeProgressIndicator();
    console.log(`
    Flow Call finished with error. Status code: ${error}
    `)
    Xrm.Navigation.openAlertDialog(alertStringsERROR, alertOptionsERROR);
    }
    }
