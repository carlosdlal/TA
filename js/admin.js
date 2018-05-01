$( document ).ready(function() {
    material = $("select[name='material']");
    subtype = $("select[name='subtype']");
    figure = $("select[name='figure']");
    x1 = $("#x1")
    x1type = $("select[name='x1-type']");
    var x1val;
    x2 = $("#x2");
    x2type = $("select[name='x2-type']");
    var x2val;
    x3 = $("#x3");
    x3type = $("select[name='x3-type']");
    var x3val;
    var pesoTotal=0;
    var cutPrice=0;
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
                    var steelArray = ["1018", "1045", "4140-T", "4140-R", "D2", "Barra-Hueca","O-1", "12L14","8620","H-13","Inoxidable"];
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
    $("#x1,#x2,#x3,#x1-type,#x2-type,#x3-type,#peso-agregado,#price,#cortes").change(function(){  
        var x2Aux=0;
        var x3Aux=0;
        cutPrice=0;
        switch(material.val()){
            case "Acero":
                if(figure.val()=="round"){
                    if(x2type.val()=="inch"){
                        x2Aux= inchesToMeters(x2.val());  
                    }
                    else{
                        x2Aux=x2.val();
                    }
                    pesoTotal=x1.val()*x1.val()*4*x2Aux;
                    if($("#peso-agregado").val()!=""){
                        pesoTotal= pesoTotal+parseFloat($("#peso-agregado").val());
                    }
                    $("#peso").val(pesoTotal.toFixed(2));
                    cutPrice=sumCortes1(subtype.val(),figure.val(),x1.val());
                }
                if(figure.val()=="square"){
                    if(x2type.val()=="mts"){
                        x2Aux= metersToInches(x2.val());  
                    }
                    else{
                        x2Aux=x2.val();
                    }
                    pesoTotal=x1.val()*x1.val()*x2Aux*.13;
                    if($("#peso-agregado").val()!=""){
                        pesoTotal= pesoTotal+parseFloat($("#peso-agregado").val());
                    }
                    $("#peso").val(pesoTotal.toFixed(2));
                    cutPrice=sumCortes1(subtype.val(),figure.val(),x1.val());        
                }
                if(figure.val()=="plate"){
                    if(x2type.val()=="mts"){
                        x2Aux= metersToInches(x2.val());  
                    }
                    else{
                        x2Aux=x2.val();
                    }
                    if(x3type.val()=="mts"){
                        x3Aux= metersToInches(x3.val());  
                    }
                    else{
                        x3Aux=x3.val();
                    }
                    pesoTotal=x1.val()*x2Aux*x3Aux*.13;
                    if($("#peso-agregado").val()!=""){
                        pesoTotal= pesoTotal+parseFloat($("#peso-agregado").val());
                    }
                    $("#peso").val(pesoTotal.toFixed(2));
                    cutPrice=sumCortes1(subtype.val(),figure.val(),x1.val(),x2.val());
                }
                break;
            case "Aluminio":
                if(figure.val()=="round"){
                    if(x2type.val()=="mts"){
                        x2Aux= metersToInches(x2.val());  
                    }
                    else{
                        x2Aux=x2.val();
                    }
                    pesoTotal=x1.val()*x1.val()*0.035*x2Aux;
                    if($("#peso-agregado").val()!=""){
                        pesoTotal= pesoTotal+parseFloat($("#peso-agregado").val());
                    }
                    $("#peso").val(pesoTotal.toFixed(2));
                    cutPrice=sumCortes1(subtype.val(),figure.val(),x1.val());
                }
                if(figure.val()=="square"){
                    if(x2type.val()=="mts"){
                        x2Aux= metersToInches(x2.val());  
                    }
                    else{
                        x2Aux=x2.val();
                    }
                    pesoTotal=x1.val()*x1.val()*x2Aux*0.048;
                    if($("#peso-agregado").val()!=""){
                        pesoTotal= pesoTotal+parseFloat($("#peso-agregado").val());
                    }
                    $("#peso").val(pesoTotal.toFixed(2));
                    cutPrice=sumCortes1(subtype.val(),figure.val(),x1.val());
                    
                }
                if(figure.val()=="plate"){
                    if(x2type.val()=="mts"){
                        x2Aux= metersToInches(x2.val());  
                    }
                    else{
                        x2Aux=x2.val();
                    }
                    if(x3type.val()=="mts"){
                        x3Aux= metersToInches(x3.val());  
                    }
                    else{
                        x3Aux=x3.val();
                    }
                    pesoTotal=x1.val()*x2Aux*x3Aux*0.048;
                    if($("#peso-agregado").val()!=""){
                        pesoTotal= pesoTotal+parseFloat($("#peso-agregado").val());
                    }
                    $("#peso").val(pesoTotal.toFixed(2));
                    cutPrice=sumCortes1(subtype.val(),figure.val(),x1.val(),x2.val());
                }
                break; 
            case "Bronce":
                if(figure.val()=="round"){
                    if(x2type.val()=="mts"){
                        x2Aux= metersToInches(x2.val());  
                    }
                    else{
                        x2Aux=x2.val();
                    }
                    pesoTotal=x1.val()*x1.val()*1.7*x2Aux;
                    if($("#peso-agregado").val()!=""){
                        pesoTotal= pesoTotal+parseFloat($("#peso-agregado").val());
                    }
                    $("#peso").val(pesoTotal.toFixed(2));
                    cutPrice=sumCortes1(subtype.val(),figure.val(),x1.val());
                }   
        }
        if($("#price").val()!=0){
            $("#peso-final").val(($("#peso").val()*$("#price").val()+cutPrice).toFixed(2));

        }
        else{
            $("#peso-final").val(0);
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
function sumCortes1(subt,fig,x1surface){
    var cortes;
    if($("#cortes").val()!=0){
        switch(fig){
            case "round":
                if(subt=="1018" || subt=="1045"|| subt=="12L14"|| subt=="8620"|| subt=="6061-T6"|| subt=="1100"){
                    cortes=(x1surface*x1surface*(3.1416/4))*4;
                }
                if(subt=="4140-T" || subt=="4140-R"|| subt=="O-1"){
                    cortes=(x1surface*x1surface*(3.1416/4))*5;
                }
                if(subt=="D2" || subt=="H-13"|| subt=="Inoxidable"|| subt=="Estandard"|| subt=="SAE-62"|| subt=="SAE-64"|| subt=="AMPCO-18"){
                    cortes=(x1surface*x1surface*(3.1416/4))*6;
                }
                break;
            case "square":
                if(subt=="1018" || subt=="1045"|| subt=="12L14"|| subt=="8620"|| subt=="6061-T6"|| subt=="1100"){
                    cortes=x1surface*x1surface*4;
                }
                if(subt=="4140-T" || subt=="4140-R"|| subt=="O-1"){
                    cortes=x1surface*x1surface*5;
                }
                if(subt=="D2" || subt=="H-13"|| subt=="Inoxidable"){
                    cortes=x1surface*x1surface*6;
                }
                break;
        }
    }
    else{
        cortes=0;
    }
    
    return cortes;
}
function sumCortes2(subt,fig,x1surface, x2surface){
    var cortes;
    switch(fig){
        case "plate":
            if(subt=="1018" || subt=="1045"|| subt=="12L14"|| subt=="8620"|| subt=="6061-T6"|| subt=="1100"){
                cortes=x1surface*x2surface*4;
            }
            if(subt=="4140-T" || subt=="4140-R"|| subt=="O-1"){
                cortes=x1surface*x2surface*5;
            }
            if(subt=="D2" || subt=="H-13"|| subt=="Inoxidable"){
                cortes=x1surface*x2surface*6;
            }
                break;
    }
    return cortes;
}