$( document ).ready(function() {
    material = $("select[name='material']");
    subtype = $("select[name='subtype']");
    figure = $("select[name='figure']");
    x1 = $("#x1").val();
    x1type = $("select[name='x1-type']");
    var x1val;
    x2 = $("#x2").val();
    x2type = $("select[name='x2-type']");
    var x2val;
    x3 = $("#x3").val();
    x3type = $("select[name='x3-type']");
    var x3val;
    $("#subtype-container").hide();
    $("#figure-container").hide();
    $(".x-containers").hide();
    material.change(function(){
        if(material.val()==""){
            $("#subtype-container").hide();
            
        }
        else{
            $("#subtype-container").show();
            $("select[name='figure'] option").remove();
            $("#figure-container").hide();
            $(".x-containers").hide();
            switch(material.val()){
                case "Acero":
                    var steelArray = ["1018", "1045", "4140-T", "4140-R", "D2", "Barra-Hueca","o-1", "12L14","8620","H-13","Inoxidable"];
                    $("select[name='subtype'] option").remove();
                    $("<option disabled selected value>Tipo de Acero</option>").appendTo(subtype);
                    for(i=0;i<steelArray.length;i++){
                        $("<option value='"+steelArray[i]+"'>"+steelArray[i]+"</option>").appendTo(subtype);
                    }
                    figureSelector(material.val());
                break;
                case "Aluminio":
                    var aluminioArray = ["6061-T6", "1100"];
                    $("select[name='subtype'] option").remove();
                    $("<option disabled selected value>Tipo de Aluminio</option>").appendTo(subtype);
                    for(i=0;i<aluminioArray.length;i++){
                        $("<option value='"+aluminioArray[i]+"'>"+aluminioArray[i]+"</option>").appendTo(subtype);
                    }
                    figureSelector(material.val(),subtype.val());
                break;
                case "Nylamid":
                    var nylamidArray = ["Blanco", "Negro", "Verde"];
                    $("select[name='subtype'] option").remove();
                    $("<option disabled selected value>Color de Nylamid</option>").appendTo(subtype);
                    for(i=0;i<nylamidArray.length;i++){
                        $("<option value='"+nylamidArray[i]+"'>"+nylamidArray[i]+"</option>").appendTo(subtype);
                    }
                    figureSelector(material.val(),subtype.val());
                break;
                case "Bronce":
                    var bronceArray = ["Estandard", "SAE-62", "SAE-64", "SAE-64", "AMPCO-18"];
                    $("select[name='subtype'] option").remove();
                    $("<option disabled selected value>Tipo de Bronce</option>").appendTo(subtype);
                    for(i=0;i<bronceArray.length;i++){
                        $("<option value='"+bronceArray[i]+"'>"+bronceArray[i]+"</option>").appendTo(subtype);
                    }
                    figureSelector(material.val(),subtype.val());
                break;
                default:
                    $("select[name='subtype'] option").remove();

                    break;
            }
        }
        
    });
    figure.change(function(){
        $(".x-containers").show();
        $("#x3-container").hide();
        switch(figure.val()){
            case "round":
                $("#x3-container").hide();
                break;
            case "square":
                $("#x3-container").hide();        
                break;
            case "plate":
                $("#x3-container").show();        
                break;
            case "buje":
                $("#x3-container").show();
                break;
        }
    });
    $("#x1", "#x2","#x3",".measurements","#peso-agregado", "#price", "#cortes").change(function(){
        switch(material.val()){
            case "Acero":
                if(figure.val()=="round"){
                    if(x2type.val()=="inch"){
                        x2= inchesToMeters(x2);
                    }
                    peso= x1*x1*4*x2;
                    alert(peso);
                }
            break;
        }
    });
});
function figureSelector(mat){
    subtype.change(function(){
        $(".x-containers").hide();
        if(subtype.val()=="Barra-Hueca"){
            $("#figure-container").hide();
        }
        else{
            $("#figure-container").show();
            $("select[name='figure'] option").remove();
            $("<option disabled selected value>Forma del Material</option>").appendTo(figure);
            $("<option value='round'>Redondo</option>").appendTo(figure);
            if(mat=="Acero" || mat=="Aluminio"||mat=="Nylamid"){
                $("<option value='plate'>Solera / Placa</option>").appendTo(figure);
                if(mat=="Acero" ||mat=="Aluminio"){
                    $("<option value='square'>Cuadrado</option>").appendTo(figure);
                }
                if(mat=="Bronce"){
                    $("<option value='buje'>Buje</option>").appendTo(figure);
                }
            }
        }
    });
}
function inchesToMeters(xval){
    var xvalue;
    xvalue=xval*0.0254;
    return xvalue;
}
function metersToInches(xval){
    var xvalue;
    xvalue=xval/0.0254;
    return xvalue;
}