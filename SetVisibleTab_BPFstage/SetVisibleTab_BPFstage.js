function ShowTab_bpfstage(executionContext){
    var formContext = executionContext.getFormContext();
    formContext.data.process.addOnStageChange(showTab);
    
    function showTab(){
        var activeStage = formContext.data.process.getActiveStage();
        var stageId = activeStage.getId();
        var tab2 = formContext.ui.tabs.get("tab_2");
        var tab3 = formContext.ui.tabs.get("tab_3");
        var tab4 = formContext.ui.tabs.get("tab_4");
        var tab5 = formContext.ui.tabs.get("tab_5");
        switch (stageId){
            //TAB2
            case "d42d3156-6257-4e96-9dda-ed4f0dcc1f5f":
                tab2.setVisible(true);
                tab3.setVisible(false);
                tab4.setVisible(false);
                tab5.setVisible(false);
                break;
            //TAB3
            case "86c31c61-6e6c-45b2-af14-7baa15be2acb":
                tab2.setVisible(true);
                tab3.setVisible(true);
                tab4.setVisible(false);
                tab5.setVisible(false);
                break;
            //TAB4
            case "b32f5f3e-8e3a-464e-966f-0f17b4aba851":
                tab2.setVisible(true);
                tab3.setVisible(true);
                tab4.setVisible(true);
                tab5.setVisible(false);
                break;
            //TAB5
            case "0dd1bf46-6246-4e2c-a60f-d8aba10d2b16":
                tab2.setVisible(true);
                tab3.setVisible(true);
                tab4.setVisible(true);
                tab5.setVisible(true);
                break;
            default:
                tab2.setVisible(false);
                tab3.setVisible(false);
                tab4.setVisible(false);
                tab5.setVisible(false);
                break;

        }

    }

}