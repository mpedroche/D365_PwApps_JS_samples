# Establecer la visibilidad de una pestaña de un formulario en base al stage del Business Process Flow.
Este código nos permite establecer las pestañas que están visibles dentro de un formulario en función del stage del BPF. Para conocer le BPF ID será necesario consultar la API 
https://org.crm4.dynamics.com/api/data/v9.0/processstages?$select=stagename&$filter=processid/workflowid eq processID
