function AdvanceBPF(executionContext) {
     var formContext = executionContext.getFormContext();
 //Obtener el valor del campo de tipo opción
     var StageValue = formContext.getAttribute("mar_stage").getValue();
 //Obtenermos el ID de la instancia del proceso
     var BPFInstanceId = formContext.data.process.getInstanceId();    
 //Declaramos variables del incio y fin   
     var StageInicio = "7da32b9a-6994-ff0b-0cdc-b9c0c3bde713";
     var StageFin = "73df2774-b083-4325-9804-845186962671";
 //Establecemos los valores del stage de incio y fin en función del valor del stage
    switch(StageValue){
        //Stage 1
        case 809620000:
            StageInicio = "7da32b9a-6994-ff0b-0cdc-b9c0c3bde713";
            StageFin = "7da32b9a-6994-ff0b-0cdc-b9c0c3bde713";
        break;
        //stage 2
        case 809620001:
            StageInicio = "7da32b9a-6994-ff0b-0cdc-b9c0c3bde713";
            StageFin = "5148b38e-5fcd-4459-98e2-c778710192dd";
        break;
        //stage 3
        case 809620002:
            StageInicio = "7da32b9a-6994-ff0b-0cdc-b9c0c3bde713";
            StageFin = "97b24b6c-0ac6-4d7d-8388-f47fec8af6fc";
        break;
        //stage 4
        case 809620003:
            StageInicio = "7da32b9a-6994-ff0b-0cdc-b9c0c3bde713";
            StageFin = "73df2774-b083-4325-9804-845186962671";   
        break;
        default:
        break;
    }
     var entity = {};
     entity["activestageid@odata.bind"] = "/processstages(" + StageFin + ")"; 
     entity["traversedpath"] = StageInicio + "," + StageFin;
//Actualizamos el registro del BPF
    Xrm.WebApi.updateRecord("new_fasesdemo", BPFInstanceId, entity).then(
	    function success(result) {
		    var updatedId = result.id;
		    console.log(updatedId);
	    },
	    function(error) {
		    console.log(error.message);
            alert("Ooohh hay un error");
	    }
    );
}
