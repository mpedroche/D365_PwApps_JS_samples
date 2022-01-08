function CallPowerAutomate(executionContext) {
    var recordId = executionContext.entityReference.id.replace('{', '').replace('}', '');
    var data = {
        "recordId": recordId
    };
    var req = new XMLHttpRequest();
    req.open("POST", "PowerAutomateURLHTTP_Trigger", true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;

            if (this.status === 200) {
                console.log("Flow Call finished successfully");
                var entityFormOptions = {};
                entityFormOptions["entityName"] = Xrm.Page.data.entity.getEntityName();
                entityFormOptions["entityId"] = Xrm.Page.data.entity.getId();
                Xrm.Navigation.openForm(entityFormOptions);
            } else {
                console.log("Flow Call finished with error. Status code: " + this.status);
                alert('Ocurrió un error durante el proceso, inténtelo más tarde.');
            }
        }
    };
    req.send(JSON.stringify(data));
    console.log("Flow Call request sent");
    alert('Proceso ejecutado correctamente. La página se recargará cuando termine el proceso.');
};