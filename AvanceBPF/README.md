# Cómo avanzar un Business Process Flow con código
En este ejemplo tenemos como debemos avanzar el BPF en base al valor de un campo de tipo opción. Para conocer los stageID debemos consultar a la API con la siguiente url:
https://org.crm4.dynamics.com/api/data/v9.0/processstages?$select=stagename&$filter=processid/workflowid eq processID
