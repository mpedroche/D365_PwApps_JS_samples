using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;


namespace DeveloperPlugins
{
    public class AdvanceBPFv2 : IPlugin
    {
        public enum stageOption
        {
            Stage1 = 809620000,
            Stage2 = 809620001,
            Stage3 = 809620002,
            Stage4 = 809620003
        }
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(null);
            var remote = context.ToRemoteExecutionContext();
            tracing.Trace(remote.ToJson());
            Entity target = null;
            Entity bpfInstance = null;
            string bpfId = "9b3b766a-e1a5-eb11-b1ac-000d3a21cdd8";
            Dictionary<string,string> bpfStages= null;
            if (context.InputParameters.Contains("Target"))
            {
                target = (Entity)context.InputParameters["Target"]; 
                bpfStages = getBPFstages(service, tracing, bpfId);
                if (bpfStages.Count != 0)
                {
                    bpfInstance = getBPF(service, tracing, target);
                    if (bpfInstance != null)
                    {
                        advanceBPF(service, tracing, bpfInstance, target, bpfStages);
                    }else
                    {
                        string message = $"There are not bpf instance for the entity {target.LogicalName}, {target.Id}";
                        tracing.Trace(message);
                    }
                }
                else
                {
                    string message = $"There are not stages for the BPF {bpfId}";
                    tracing.Trace(message);
                }
            }
            else
            {
                string errorMessage = $"There was an error because there is not target";
                tracing.Trace(errorMessage);
                throw new InvalidPluginExecutionException(errorMessage);
            }

        }

        private Dictionary<string,string> getBPFstages(IOrganizationService service, ITracingService tracing, string bpfId)
        {
            var stageDictionary = new Dictionary<string,string>();
            EntityCollection stageRecords = new EntityCollection();
            var query_processid = bpfId;
            var query = new QueryExpression("processstage");
            query.ColumnSet.AddColumns("stagename", "processstageid");
            query.Criteria.AddCondition("processid", ConditionOperator.Equal, query_processid);
            try
            {
                stageRecords = service.RetrieveMultiple(query);
            }
            catch (Exception ex)
            {
                string message = $"There was an error retrieving the BPF stages because {ex.Message}";
                tracing.Trace(message);
                throw new InvalidPluginExecutionException(message);
            }
            if (stageRecords.Entities.Count != 0)
            {
                foreach (Entity stageRecord in stageRecords.Entities)
                {
                    string stageGuid = stageRecord.Attributes["processstageid"].ToString().Replace("{", "").Replace("}", "");
                    string stageName = (string)stageRecord.Attributes["stagename"];
                    stageDictionary.Add(stageName, stageGuid);
                }
            }
            return stageDictionary;
        }

        private Entity getBPF(IOrganizationService service, ITracingService tracing, Entity target)
        {
            Entity activeBPFiInstance = new Entity();
            RetrieveProcessInstancesResponse targetBPFsResponse = new RetrieveProcessInstancesResponse();
            RetrieveProcessInstancesRequest entityBPFsRequest = new RetrieveProcessInstancesRequest
            {
                EntityId = target.Id,
                EntityLogicalName = target.LogicalName
            };
            try
            {
                targetBPFsResponse = (RetrieveProcessInstancesResponse)service.Execute(entityBPFsRequest);
            }
            catch (Exception ex)
            {
                string message = $"There was an error retrieving the BPF for the id {target.Id} because {ex.Message}";
                tracing.Trace(message);
                throw new InvalidPluginExecutionException(message);
            }

            if (targetBPFsResponse.Processes != null && targetBPFsResponse.Processes.Entities != null)
            {
                activeBPFiInstance = targetBPFsResponse.Processes.Entities[0];
            }
            return activeBPFiInstance;
        }
        private void advanceBPF(IOrganizationService service, ITracingService tracing, Entity bpfInstance, Entity target, Dictionary<string, string> bpfStages)
        {
            string stageFin = bpfStages["Stage 1"];
            string StageInicio = bpfStages["Stage 1"];
            if (target.Attributes.Contains("mar_stage"))
            {
                int activeStage = ((OptionSetValue)target["mar_stage"]).Value;
                switch (activeStage)
                {
                    case (int)stageOption.Stage1:
                        stageFin = bpfStages["Stage 1"];
                        break;
                    case (int)stageOption.Stage2:
                        stageFin = bpfStages["Stage 2"];
                        break;
                    case (int)stageOption.Stage3:
                        stageFin = bpfStages["Stage 3"];
                        break;
                    case (int)stageOption.Stage4:
                        stageFin = bpfStages["Stage 4"];
                        break;
                    default:
                        break;
                }
                tracing.Trace(stageFin);
                string newTraversedpath = StageInicio + "," + stageFin;
                tracing.Trace(newTraversedpath);
                Entity bpf = new Entity("new_fasesdemo")
                {
                    Id = bpfInstance.Id
                };
                bpf.Attributes["traversedpath"] = newTraversedpath;
                bpf.Attributes["activestageid"] = new EntityReference("processstage", new Guid(stageFin));
                try
                {
                    service.Update(bpf);
                }
                catch (Exception ex)
                {
                    string message = $"There was an error updating the BPF because {ex.Message}";
                    tracing.Trace(message);
                    throw new InvalidPluginExecutionException(message);
                }

            }
            else
            {
                string message = $"There is not mar_stage attribute in target {target.Id}";
                tracing.Trace(message);
            }
        }
    }
}
