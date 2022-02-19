function CallPowerAutomate(primaryControl) {

    //Obtenemos el contexto de ejecución.
    var formContext = primaryControl;
    var recordId = formContext.data.entity.getId().replace('{', '').replace('}', '');
    
    //Obtenermos el ID del registro para enviar al Power Automate.
    var data = {
        "recordId": recordId
    };
    
    //Generamos la variables del cuadro de dialogo que se abrirá en caso de error.
    var alertStrings = { text:"Ocurrió un error, intentelo de nuevo. Si el problema persiste contacte con el administrador", title:"ERROR", confirmButtonLabel:"Aceptar"};
    var alertOptions = { height: 200, width: 450  };
    
    //Haremos la llamada a nuestro Power Automate.
    var req = new XMLHttpRequest();
    req.open("POST", "PowerAutomateURL", true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;

            if (this.status === 200) {
            
                //Si se ejecuta correctamente.
                console.log("Flow Call finished successfully");
                
                //Cerramos el indicador de proceso.
                formContext.data.refresh(false).then(
                    function success(results){
                        Xrm.Utility.closeProgressIndicator();
                    }
                    , function (error) {
                        console.log(error.message);
                    }
                    );    
                //Refrescamos el registro, para actualizar los cambios en los datos.
                //var entityFormOptions = {};
                //entityFormOptions["entityName"] = formContext.data.entity.getEntityName();
                //entityFormOptions["entityId"] = formContext.data.entity.getId();
                //Xrm.Navigation.openForm(entityFormOptions);
            } else {
            
                //Si NO se ejecuta correctamente.
                Xrm.Utility.closeProgressIndicator();
                console.log("Flow Call finished with error. Status code: ")
                //Abrimos cuadro de dialogo con alerta.
                Xrm.Navigation.openAlertDialog(alertStrings,alertOptions).then(closeCallback,errorCallback);
            }
        }
    };
    req.send(JSON.stringify(data));
    
    //Iniciamos un indicador de proceso.
    Xrm.Utility.showProgressIndicator("Please wait...");
    console.log("Flow Call request sent");
};
