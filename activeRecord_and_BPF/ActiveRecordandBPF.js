function ClickCustomButton(executionContext)
{

    var recordId = executionContext.entityReference.id.replace('{', '').replace('}', '');
    var data = { "statecode": 0, "statuscode": 1 };
    var entityLogicalName = "mar_tablename";
   
    Xrm.WebApi.updateRecord(entityLogicalName, recordId, data).then(
        function success(result) { 
           
            var StateCodeActive = 0;
            var StatusCodeActive = 1; 
            var databpf = { "statecode": StateCodeActive, "statuscode": StatusCodeActive };
            var BPFId = "E99D045F-A972-EB11-A812-000D3AD9694D";
            var req1 = new XMLHttpRequest();
            req1.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/mar_bpftables?$filter=_bpf_mar_tablenameid_value eq '"+recordId+"'&$select=businessprocessflowinstanceid", true);
            req1.onreadystatechange = function() {
                
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                if (this.status === 204) {
             var BPFinstanceid = this.businessprocessflowinstanceid;      
  //------------------------------------------------------
             var req = new XMLHttpRequest();
             req.open("PATCH", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/mar_bpftables(" + BPFinstanceid + 
                ")", true);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.onreadystatechange = function() {
                
            if (this.readyState === 4) {
                req.onreadystatechange = null;
            if (this.status === 204) {
               alert("Success");
            } else {
               alert("Error");
            }
                }
            };
            req.send(JSON.stringify(databpf));    
            executionContext.data.refresh(true);
         }
         else {
            alert("Error");
         }
        }
        }
        },
         function (error) {
            
            alert ("Ocurrio un error");
            executionContext.data.refresh(true); 
        }
    );

}
