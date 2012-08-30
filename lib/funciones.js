/* PROYECTO: COR PROCESSU MOBILE */

/* Limpia las variables del localStorage, y redirecciona al Login
 * 20120613 MT
 */
function salir() {
	localStorage.clear();
	window.open("index.html","_self");	
}
	
function GetContactos(){

	jQuery.get("http://corprocessu.com:8000/contactos",function(resultado){
		miRes = jQuery.parseJSON(resultado);
		html = '<ul data-role="listview" id="Contactos">';
		$.each(miRes, function(i, elemento){
			html+='<li><h3>Nombre: '+elemento.nombre+'</h3><p>Numero: '+elemento.nro+'</p><p> Email: '+elemento.email +'</p></li><li data-role="list-divider" role="heading"></li>';
		});
		html+='</ul>';
		$(html).appendTo("#listac");
		redireccionar('Contactos.html\#contact')
	});
}
	
	
/* Abre una nueva ventana en la página de SID
 * 20120613 MT
 */
function sid() {
	window.open("http://www.integradores.net");		
}

/* Función que redirecciona al url pasapa por parámetro
 * 20120613 MT
 */
function redireccionar(url) {
	localStorage.regresar = url;
	window.open(url,"_self");
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'A'
 * 20120613 MT
 */
function cargarTareasAbiertas(){
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSAbiertas.php?jsoncallback=?", {usuario:localStorage.nombre}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				}
			}
			html = html + '<li><a onClick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
		$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSAbiertas.html\#consulta_os";
	});	
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'C'
 * 20120613 MT
 */
function cargarTareasCerradas(){
	usuarioConectado = localStorage.nombre;
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSCerradas.php?jsoncallback=?", {usuario:usuarioConectado}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				}
			}
			html = html + '<li><a onclick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
		$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSCerradas.html\#consulta_os";
	});	
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, cuya fecha límite sea igual a la fecha del sistema
 * 20120613 MT
 */
function cargarTareasHoy(){
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSHoy.php?jsoncallback=?", {usuario:localStorage.nombre}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				}
			}
	html = html + '<li><a onclick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
			$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSHoy.html\#consulta_os";
	});	
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, siempre que se encuentren vencidas
 * 20120613 MT 
 */
function cargarTareasVencidas(){
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSVencidas.php?jsoncallback=?", {usuario:localStorage.nombre}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				}
			}
			html = html + '<li><a onclick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
		$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSVencidas.html\#consulta_os";
	});	
}	

/* Realiza la validación de los datos del login
 * 20120613 MT 
 */
function login () {
	var usuario = document.getElementById("login").value;
	var psw = document.getElementById("password").value;
		
	// Se validan los datos del usuario
	$.getJSON("http://nube4u.com/sid_servicios/json/validarLogin.php?jsoncallback=?", {usuario:usuario , psw:psw}, function(data){
		var login = data.result;
		if (login == 'OK') {
			localStorage.nombre = usuario;
			localStorage.Inempinst = ""; //20120619 alvaro
			localStorage.Intipo = "";  //20120619 alvaro
			location.href="index.html\#menu_principal";
		} else if (login == 'BD') {
			alert("Se produjo un error al conectar con la BD");	
		} else if (login == 'US') {
			alert ("El usuario no se encuentra registrado en la base de datos o se encuentra inactivo.");
		} else if (login == 'NO') {
			alert ("Contraseña inválida.");
		}
				
   	});	
	
}

/* Obtiene la lista de las tareas que puede ver el usuario logueado, a las cuales se les haya registrado un tracking durante el día en curso
 * 20120613 alvaro
 */
function cargarTareasTS(){
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	var res = '';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSTimeSheet.php?jsoncallback=?", function(count) {	
			if (count.cant == 0) {	
				location.href="ConsultaTimesheet.html\#timeSheet";
			} else {
				$.getJSON("http://nube4u.com/sid_servicios/json/listaOSTimeSheet.php?jsoncallback=?", function(data) {	
					$.each(data, function(i, item) {
						if (res != item.trk_login_mod) {
							if(res == ''){
								html+= '<h3>'+ item.trk_login_mod +'</h3><p><ul data-role="listview" data-inset="true">';
								res= item.trk_login_mod;
							} else{
								html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b">';
								html+= '<h3>'+ item.trk_login_mod +'</h3><ul data-role="listview" data-inset="true">';
								res= item.trk_login_mod;
							}
						}
						html = html + '<li><a onclick="consultarTareaTS(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '</p><p>'+ item.trk_obs+';'+ item.trk_login_mod + '; ' + item.estatus +'</p></li>';	
					});
					html = html + '</ul></p></div></div></div></div>';
					$(html).appendTo("#timesheet");
					res='';
					location.href="ConsultaTimesheet.html\#timeSheet";
				});
			}
		});
}

/* Guarda en el localstorage de html5 el unicode de la tarea a consultar, y redirecciona a la página DetalleTareaTS.php
 * 20120613 alvaro
 */
function consultarTareaTS(tarea) {
	localStorage.tarea = tarea;
	var htmlh = '<h1>Detalle Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="DetalleTareaTS.html";
}

/* Guarda en el localstorage de html5 el unicode de la tarea a consultar, y redirecciona a la página DetalleTarea.php
 * 20120614 MT
 */
function consultarTarea(tarea) {
	localStorage.tarea = tarea;
	var htmlh = '<h1>Detalle Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="DetalleTarea.html";
}

/* Obtiene los datos de la tarea a consultar, y sus Trackings
 * 20120614 MT
 */
function cargarDetallesTarea () {
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Detalle Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	var html = '<div data-role="content"><div data-role="controlgroup" data-type="horizontal" align="center"><a onclick="cargarTrkTarea(' + tarea + ')" data-role="button" data-theme="b">Ver TRK</a><a onclick="ingresarTrk(' + tarea + ')" data-role="button" data-theme="b">Ingresar TRK</a></div><div data-role="controlgroup" data-type="horizontal" align="center"><a onclick="reasignarTarea(' + tarea + ')" data-role="button" data-theme="b">Reasignar</a><a onclick="consultarRRHHtarea(' + tarea + ')" data-role="button" data-theme="b">Consultar RRHH</a></div>'; // add AM
	
	$.getJSON("http://nube4u.com/sid_servicios/json/OSDetalle.php?jsoncallback=?", {tarea:tarea}, function(data) {
		$.each(data, function(i, item) {
			html = html + '<label for="empinst">Empinst: </label><input type="text" name="empinst" id="empinst" value="'+item.empinst+'" readonly/>';
			html = html + '<label for="contacto">Contacto: </label><input type="text" name="contacto" id="contacto" value="'+item.contacto+'" readonly/>';
			html = html + '<label for="resp">Responsable: </label><input type="text" name="resp" id="resp" value="'+item.resp+'" readonly/>';
			html = html + '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+item.id+'" readonly/>';
			html = html + '<label for="desc">Tarea Detalle:</label><textarea cols="40" rows="8" name="desc" id="desc" readonly>'+item.desc+'</textarea>';
			html = html + '<label for="tipo">Tarea Tipo: </label><input type="text" name="tipo" id="tipo" value="'+item.tipo+'" readonly/>';
			html = html + '<label for="subtipo">Tarea Sub Tipo: </label><input type="text" name="subtipo" id="subtipo" value="'+item.subtipo+'" readonly/>';
			html = html + '<label for="prioridad">Prioridad: </label><input type="text" name="prioridad" id="prioridad" value="'+item.prioridad+'" readonly/>';
			html = html + '<label for="estatus">Estatus de Avance: </label><input type="text" name="estatus" id="estatus" value="'+item.estatus+'" readonly/>';
			html = html + '<label for="hp">Horas Planificadas: </label><input type="text" name="hp" id="hp" value="'+item.hp+'" readonly/>';
			html = html + '<label for="fec_lim">Fecha Límite: </label><input type="text" name="fec_lim" id="fec_lim" value="'+item.fec_lim+'" readonly/>';
			html = html + '<label for="fp">Factor de Ponderación (%): </label><input type="text" name="fp" id="fp" value="'+item.fp+'" readonly/>';
			html = html + '<label for="emp">Empresa: </label><input type="text" name="emp" id="emp" value="'+item.emp+'" readonly/>';
			html = html + '<label for="proy">Proyecto: </label><input type="text" name="proy" id="proy" value="'+item.proy+'" readonly/>';
			html = html + '<label for="fase">Fase: </label><input type="text" name="fase" id="fase" value="'+item.fase+'" readonly/>';
			html = html + '<label for="prod">Producto: </label><input type="text" name="prod" id="prod" value="'+item.prod+'" readonly/>';
			html = html + '</div>';
		});
		$(html).appendTo("#detalleTarea");
		location.href="DetalleTarea.html\#detalle_tarea";
	});
}
	
/* Redirecciona a la pagina de consulta de traking 
 * 20120615 MT
 */
function cargarTrkTarea(tarea) { 
	location.href="TrkTarea.html";
}

/* Obtiene la lista de Tracking cargados a una tarea (localStorage.tarea 
 * 20120615 maria
 */
function cargarTrk() {
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Tracking Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	var html = '<div data-role="content">';
	var html = '<div data-role="content" align="center"><ul data-role="listview" data-inset="true"><li data-role="list-divider" role="heading"><h3>Tracking</h3></li>';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaTrkOS.php?jsoncallback=?", {tarea:tarea}, function(data) {
		$.each(data, function(i, item) {
			html = html + '<li><h3>Registrado por:'+item.trk_login_mod+'</h3><p></p><p>'+ item.trk_obs+'</p><p> '+item.trk_fec_mod+'; '+ item.estatus+ '</p></li>';
		});
		html = html + '<li data-role="list-divider" role="heading"></li></ul></div>';
		$(html).appendTo("#TrkTarea");
		location.href="TrkTarea.html\#trk_tarea";
	});
}

/* Funcion que redirecciona al url IngresarTracking.html y almacena en localStorage la tarea pasada por parametro 
 * 20120614 alvaro
 */
function ingresarTrk(tarea){
	localStorage.tarea = tarea;
	location.href="IngresarTracking.html";
}

/* Muestra el formulario para ingresar un nuevo tracking
 * 20120614 alvaro
 */
function ingresarTrack(){
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Ingresar Trackin Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+tarea+'" readonly/>';
	$.getJSON("http://nube4u.com/sid_servicios/json/preIngresoTraking.php?jsoncallback=?", {tarea:localStorage.tarea}, function(data) {
		$.each(data, function(i, item) {
			if(i==0) {
				html += '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+item.id+'" readonly/>';
				html += '<label for="Obs">Observación:</label><textarea cols="40" rows="8" name="Obs" id="Obs"> </textarea>';
				html += '<label for="selectEstatus" class="select">Estatus:</label><select name="selectEstatus" id="selectEstatus" data-theme="b">' ;	
			}	
				 html+='<option value="'+item.estatus_sec+'">'+item.estatus+'</option>';	
			});
				
			html += '</select><label for="horas">Tiempo Registrado: </label><input type="number" name="horas" id="horas"/>'
			html += '<button onclick="ingresar()" value="Ingresar" name="envia" data-theme="b"></button><br>';
			$(html).appendTo("#images_ingresar");
			location.href="IngresarTracking.html\#ingresar";
		});
			
	} 
	
/* Guarda en la base de datos un tracking con los datos suministrados por la funcion ingresarTrack
 * 20120614 alvaro
 */
function ingresar(){
	llamador = localStorage.llamador;
	var estatus = $('#selectEstatus').val();
	var obs = document.getElementById("Obs").value;
	var horas = document.getElementById("horas").value;
	$.getJSON("http://nube4u.com/sid_servicios/json/IngresoTraking.php?jsoncallback=?", {usuario:localStorage.nombre,tarea:localStorage.tarea,estatus:estatus,obs:obs,horas:horas}, function(data) {
		if(llamador == 1)
			location.href="DetalleTarea.html";
		else
			location.href="javascript:history.go(-3)";
	});
}


/* Carga el formulario para el ingreso de una nueva Tarea
 * 20120615 MT
 */
function preingresarTarea(){
	limpiarStorage();
	var hoy = new Date;
	var html = '<label for="selectEmpinst" class="select">Empinst:</label><select name="selectEmpinst" id="selectEmpinst" data-theme="b" onChange="almacenarEmpInst(this);">';
	html += '<option value="0">Seleccione</option>';
	$.getJSON("http://nube4u.com/sid_servicios/json/preIngresoTarea.php?jsoncallback=?",{empinst:localStorage.Inempinst,tipo:localStorage.Intipo}, function(data) {
		$.each(data, function(i, item) {
			if(i == 0){
				for (var ii in item.EMPINST){ 
					if(ii=="evalScript"){break;}
					html+='<option value="'+item.EMPINST[ii].sec+'">'+item.EMPINST[ii].id+'</option>';	
				}	
			} else if(i == 1){
				html += '</select><br><label for="selectContacto" class="select">Contacto:</label><select name="selectContacto" id="selectContacto" data-theme="b" onChange="almacenarContacto(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.CONTACTO){ 
				    if(ii=="evalScript"){break;}
					html+='<option value="'+item.CONTACTO[ii].sec+'">'+item.CONTACTO[ii].id+'</option>';
				}
			}else if(i == 3){
				html += '</select><br><label for="tarea_id">Tarea ID:</label><input type="text" name="tarea_id" id="tarea_id" onChange="almacenarTarea();"/><br><label for="tarea_detalle">Tarea Detalle:</label><textarea cols="40" rows="8" name="tarea_detalle" id="tarea_detalle" onChange="almacenarTareaDetalle();"></textarea><br><label for="selectTipo" class="select">Tipo:</label><select name="selectTipo" id="selectTipo" data-theme="b" onChange="almacenarTipo(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.TIPO){ 
				    if(ii=="evalScript"){break;}
					html+='<option value="'+item.TIPO[ii].sec+'">'+item.TIPO[ii].id+'</option>';
				}
			}else if(i == 4){
				html += '</select><br><label for="selectsubTipo" class="select">SubTipo:</label><select name="selectsubTipo" id="selectsubTipo" data-theme="b" onChange="almacenarSubtipo(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.SUBTIPO){ 
					if(ii=="evalScript"){break;}
					html+='<option value="'+item.SUBTIPO[ii].sec+'">'+item.SUBTIPO[ii].id+'</option>';
				}
			}else if(i == 2){
				html += '</select><br><label for="selectResp" class="select">Responsable:</label><select name="selectResp" id="selectResp" data-theme="b" onChange="almacenarResp(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.RESP){ 
					if(ii=="evalScript"){break;}
					html+='<option value="'+item.RESP[ii].sec+'">'+item.RESP[ii].id+'</option>';
				}
			}else if(i == 5){
				html += '</select><br><label for="selectPRIORI" class="select">Prioridad:</label><select name="selectPRIORI" id="selectPRIORI" data-theme="b" onChange="almacenarPrioridad(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.PRIORI){ 
				    if(ii=="evalScript"){break;}
					html+='<option value="'+item.PRIORI[ii].sec+'">'+item.PRIORI[ii].id+'</option>';
				}
			 }			
		});
				
		html += '</select>'
		html += '<label for="hp">Horas Planificadas:</label><input type="number" name="hp" id="hp" onChange="almacenarHP();"/><label for="fec_limite">Fecha Límite:</label><input type="datetime" name="fec_limite" id="fec_limite" value="'+String(hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear())+'" onChange="almacenarFecLimite();"/>';
		html += '<button onclick="ingresarTarea()" value="Ingresar" name="envia" data-theme="b"></button><br>';
		$(html).appendTo("#ingresar_tarea");
		localStorage.feclimite = String(hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear());
		location.href="IngresarOS.html\#ingresar_t";
	});		
} 

function preingresarTarea1(){
	
	var html = '<label for="selectEmpinst" class="select">Empinst:</label><select name="selectEmpinst" id="selectEmpinst" data-theme="b" onChange="almacenarEmpInst(this);">';
	html += '<option value="0">Seleccione</option>';
	$.getJSON("http://nube4u.com/sid_servicios/json/preIngresoTarea.php?jsoncallback=?",{empinst:localStorage.empist,tipo:localStorage.tipo}, function(data) {
		$.each(data, function(i, item) {
			if(i == 0){		
				for (var ii in item.EMPINST){ 
					if(ii=="evalScript"){break;}
					html+='<option value="'+item.EMPINST[ii].sec+'">'+item.EMPINST[ii].id+'</option>';	
				}
			} else if(i == 1){
				html += '</select><br><label for="selectContacto" class="select">Contacto:</label><select name="selectContacto" id="selectContacto" data-theme="b" onChange="almacenarContacto(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.CONTACTO){ 
				    if(ii=="evalScript"){break;}
					html+='<option value="'+item.CONTACTO[ii].sec+'">'+item.CONTACTO[ii].id+'</option>';
				}
			}else if(i == 3){
				html += '</select><br><label for="tarea_id">Tarea ID:</label><input type="text" name="tarea_id" id="tarea_id" value="'+localStorage.tareaid+'" onChange="almacenarTarea();"/><br><label for="tarea_detalle">Tarea Detalle:</label><textarea cols="40" rows="8" name="tarea_detalle" id="tarea_detalle" onChange="almacenarTareaDetalle();">'+localStorage.tareadetalle+'</textarea><br><label for="selectTipo" class="select">Tipo:</label><select name="selectTipo" id="selectTipo" data-theme="b" onChange="almacenarTipo(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.TIPO){ 
				    if(ii=="evalScript"){break;}
					html+='<option value="'+item.TIPO[ii].sec+'">'+item.TIPO[ii].id+'</option>';
				}
			}else if(i == 4){
				html += '</select><br><label for="selectsubTipo" class="select">SubTipo:</label><select name="selectsubTipo" id="selectsubTipo" data-theme="b" onChange="almacenarSubtipo(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.SUBTIPO){ 
					if(ii=="evalScript"){break;}
					html+='<option value="'+item.SUBTIPO[ii].sec+'">'+item.SUBTIPO[ii].id+'</option>';
				}
			}else if(i == 2){
				html += '</select><br><label for="selectResp" class="select">Responsable:</label><select name="selectResp" id="selectResp" data-theme="b" onChange="almacenarResp(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.RESP){ 
					if(ii=="evalScript"){break;}
					html+='<option value="'+item.RESP[ii].sec+'">'+item.RESP[ii].id+'</option>';
				}
			}else if(i == 5){
				html += '</select><br><label for="selectPRIORI" class="select">Prioridad:</label><select name="selectPRIORI" id="selectPRIORI" data-theme="b" onChange="almacenarPrioridad(this);">';
				html += '<option value="0">Seleccione</option>';
				for (var ii in item.PRIORI){ 
				    if(ii=="evalScript"){break;}
					html+='<option value="'+item.PRIORI[ii].sec+'">'+item.PRIORI[ii].id+'</option>';
				}
			 }	
		});
				
		html += '</select>'
		html += '<label for="hp">Horas Planificadas:</label><input type="number" name="hp" id="hp" value="'+localStorage.hp+'" onChange="almacenarHP();"/><label for="fec_limite">Fecha Límite:</label><input type="datetime" name="fec_limite" id="fec_limite" value="'+localStorage.feclimite+'" onChange="almacenarFecLimite();"/>';
		html += '<button onclick="ingresarTarea()" value="Ingresar" name="envia" data-theme="b"></button><br>';
		$(html).appendTo("#ingresar_tarea1");
		if (localStorage.empinst != 0) {document.getElementById('selectEmpinst').value = localStorage.empist;}
		if (localStorage.contacto != 0) {document.getElementById('selectContacto').value = localStorage.contacto;}
		if (localStorage.tipo != 0) {document.getElementById('selectTipo').value = localStorage.tipo;}
		if (localStorage.subtipo != 0) {document.getElementById('selectsubTipo').value = localStorage.subtipo;}
		if (localStorage.responsable != 0) {document.getElementById('selectResp').value = localStorage.responsable;}
		if (localStorage.prioridad != 0) {document.getElementById('selectPRIORI').value = localStorage.prioridad;}
		
		location.href="IngresarOS1.html\#ingresar_t";
	});		
} 


/* Funcion que redirecciona al url IngresarTracking.html y almacena en localStorage la tarea pasada por parametro 
 * 20120618 alvaro
 */
function ingresarTrkTS(tarea){
	localStorage.tarea = tarea;
	location.href="IngresarTrackingTS.html";
}

/* Muestra el formulario para ingresar un nuevo tracking
 * 20120618 alvaro
 */
function ingresarTrackTS(){
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Ingresar Trackin Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+tarea+'" readonly/>';
	$.getJSON("http://nube4u.com/sid_servicios/json/preIngresoTraking.php?jsoncallback=?", {tarea:localStorage.tarea}, function(data) {
		$.each(data, function(i, item) {
			if(i==0) {
				html += '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+item.id+'" readonly/>';
				html += '<label for="Obs">Observación:</label><textarea cols="40" rows="8" name="Obs" id="Obs"> </textarea>';
				html += '<label for="selectEstatus" class="select">Estatus:</label><select name="selectEstatus" id="selectEstatus" data-theme="b">' ;	
			}	
				 html+='<option value="'+item.estatus_sec+'">'+item.estatus+'</option>';	
			});
				
			html += '</select><label for="horas">Tiempo Registrado: </label><input type="number" name="horas" id="horas"/>'
			html += '<button onclick="ingresar()" value="Ingresar" name="envia" data-theme="b"></button><br>';
			$(html).appendTo("#images_ingresar");
			location.href="IngresarTrackingTS.html\#ingresar";
		});
			
	}

/* Obtiene los datos de la tarea a consultar, y sus Trackings
 * 20120619 MT
 */
function cargarDetallesTareaTS() {	
	localStorage.llamador = 1;
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Detalle Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	var html = '<div data-role="content"><div data-role="controlgroup" data-type="horizontal" align="center"><a onclick="cargarTrkTareaTS(' + tarea + ')" data-role="button" data-theme="b">Ver Tracking</a><a onclick="ingresarTrkTS(' + tarea + ')" data-role="button" data-theme="b">Ingresar Tracking</a></div>';
	$.getJSON("http://nube4u.com/sid_servicios/json/OSDetalle.php?jsoncallback=?", {tarea:tarea}, function(data) {
		$.each(data, function(i, item) {
			html = html + '<label for="empinst">Empinst: </label><input type="text" name="empinst" id="empinst" value="'+item.empinst+'" readonly/>';
			html = html + '<label for="contacto">Contacto: </label><input type="text" name="contacto" id="contacto" value="'+item.contacto+'" readonly/>';
			html = html + '<label for="resp">Responsable: </label><input type="text" name="resp" id="resp" value="'+item.resp+'" readonly/>';
			html = html + '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+item.id+'" readonly/>';
			html = html + '<label for="desc">Tarea Detalle:</label><textarea cols="40" rows="8" name="desc" id="desc" readonly>'+item.desc+'</textarea>';
			html = html + '<label for="tipo">Tarea Tipo: </label><input type="text" name="tipo" id="tipo" value="'+item.tipo+'" readonly/>';
			html = html + '<label for="subtipo">Tarea Sub Tipo: </label><input type="text" name="subtipo" id="subtipo" value="'+item.subtipo+'" readonly/>';
			html = html + '<label for="prioridad">Prioridad: </label><input type="text" name="prioridad" id="prioridad" value="'+item.prioridad+'" readonly/>';
			html = html + '<label for="estatus">Estatus de Avance: </label><input type="text" name="estatus" id="estatus" value="'+item.estatus+'" readonly/>';
			html = html + '<label for="hp">Horas Planificadas: </label><input type="text" name="hp" id="hp" value="'+item.hp+'" readonly/>';
			html = html + '<label for="fec_lim">Fecha Límite: </label><input type="text" name="fec_lim" id="fec_lim" value="'+item.fec_lim+'" readonly/>';
			html = html + '<label for="fp">Factor de Ponderación (%): </label><input type="text" name="fp" id="fp" value="'+item.fp+'" readonly/>';
			html = html + '<label for="emp">Empresa: </label><input type="text" name="emp" id="emp" value="'+item.emp+'" readonly/>';
			html = html + '<label for="proy">Proyecto: </label><input type="text" name="proy" id="proy" value="'+item.proy+'" readonly/>';
			html = html + '<label for="fase">Fase: </label><input type="text" name="fase" id="fase" value="'+item.fase+'" readonly/>';
			html = html + '<label for="prod">Producto: </label><input type="text" name="prod" id="prod" value="'+item.prod+'" readonly/>';
			html = html + '</div>';
		});
		$(html).appendTo("#detalleTarea");
		location.href="DetalleTareaTS.html\#detalle_tarea";
	});
}

/* Redirecciona a la pagina de consulta de traking 
 * 20120619 MT
 */
function cargarTrkTareaTS(tarea) { 
	location.href="TrkTareaTS.html";
}


/* Obtiene la lista de Tracking cargados a una tarea (localStorage.tarea 
 * 20120619 MT
 */
function cargarTrkTS() {
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Tracking Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	var html = '<div data-role="content">';
	var html = '<div data-role="content" align="center"><ul data-role="listview" data-inset="true"><li data-role="list-divider" role="heading"><h3>Tracking</h3></li>';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaTrkOS.php?jsoncallback=?", {tarea:tarea}, function(data) {
		$.each(data, function(i, item) {
			html = html + '<li><h3>Registrado por:'+item.trk_login_mod+'</h3><p></p><p>'+ item.trk_obs+'</p><p> '+item.trk_fec_mod+'; '+ item.estatus+ '</p></li>';
		});
		html = html + '<li data-role="list-divider" role="heading"></li></ul></div>';
		$(html).appendTo("#TrkTarea");
		location.href="TrkTareaTS.html\#trk_tarea";
	});
}

/* Almacena en el localStorage empresa de la tarea
 * 20120621 MT
 */
function almacenarEmpInst(empinst) {
	localStorage.empist = empinst.options[empinst.selectedIndex].value;
	location.href="IngresarOS1.html";
}

/* Almacena en el localStorage el contacto de la tarea
 * 20120621 MT
 */
function almacenarContacto(contacto) {
	localStorage.contacto = contacto.options[contacto.selectedIndex].value;
}

/* Almacena en el localStorage el tipo de la tarea
 * 20120621 MT
 */
function almacenarTipo(tipo) {
	localStorage.tipo = tipo.options[tipo.selectedIndex].value;
	location.href="IngresarOS1.html";
}

/* Almacena en el localStorage el subtipo de la tarea
 * 20120621 MT
 */
function almacenarSubtipo(subtipo) {
	localStorage.subtipo = subtipo.options[subtipo.selectedIndex].value;
}

/* Almacena en el localStorage el responsable de la tarea
 * 20120621 MT
 */
function almacenarResp(responsable) {
	localStorage.responsable = responsable.options[responsable.selectedIndex].value;
}

/* Almacena en el localStorage la prioridad de la tarea
 * 20120621 MT
 */
function almacenarPrioridad(prioridad) {
	localStorage.prioridad = prioridad.options[prioridad.selectedIndex].value;
}

/* Almacena en el localStorage el id de la tarea
 * 20120621 MT
 */
function almacenarTarea() {
	localStorage.tareaid = document.getElementById("tarea_id").value;
}

/* Almacena en el localStorage la descripcion de la tarea
 * 20120621 MT
 */
function almacenarTareaDetalle() {
	localStorage.tareadetalle = document.getElementById("tarea_detalle").value;
}

/* lmacena en el localStorage las horas planificadas para la tarea
 * 20120621 MT
 */
function almacenarHP() {
	localStorage.hp = document.getElementById("hp").value;
}

/* Almacena en el localStorage la fecha limite de la tarea
 * 20120621 MT
 */
function almacenarFecLimite() {
	localStorage.feclimite = document.getElementById("fec_limite").value;
}

/* Limpia las variables utilizadas en el ingreso de tarea
 * 20120621 MT
 */
function limpiarStorage() {
	localStorage.empist = '';
	localStorage.contacto = '';
	localStorage.tipo = '';
	localStorage.subtipo = '';
	localStorage.responsable = '';
	localStorage.prioridad = '';
	localStorage.tareaid = '';
	localStorage.tareadetalle = '';
	localStorage.hp = '';
	localStorage.feclimite = '';
}

/* Guarda en la base de datos los datos de la nueva tarea
 * 20120621 MT
 */
function ingresarTarea(){
	$.getJSON("http://nube4u.com/sid_servicios/json/IngresoTarea.php?jsoncallback=?", {usuario:localStorage.nombre, empinst:localStorage.empist,contacto:localStorage.contacto,tipo:localStorage.tipo,subtipo:localStorage.subtipo,resp:localStorage.responsable,prioridad:localStorage.prioridad,tareaid:localStorage.tareaid,tareadetalle:localStorage.tareadetalle,hp:localStorage.hp,feclimite:localStorage.feclimite}, function(data) {
		if (data.result == "OK") {
			location.href="IngresarOS.html\#ingresar_t";
			limpiarStorage();
		}
	});
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'A' ordenadas segun su prioridad
 * 20120621 MT
 */
function cargarTareasAbiertasP(){
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSAbiertasP.php?jsoncallback=?", {usuario:localStorage.nombre}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true" >';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b" data-inset="true">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				}
			}
			html = html + '<li><a onClick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
		$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSAbiertasP.html\#consulta_osp";
	});	
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'C' ordenadas segun su prioridad
 * 20120622 MT
 */
function cargarTareasCerradasP(){
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSCerradasP.php?jsoncallback=?", {usuario:localStorage.nombre}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				}
			}
			html = html + '<li><a onClick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
		$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSCerradasP.html\#consulta_osp";
	});	
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, siempre que se encuentren vencidas, ordenadas segun su prioridad
 * 20120622 MT 
 */
function cargarTareasVencidasP(){
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSVencidasP.php?jsoncallback=?", {usuario:localStorage.nombre}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b" data-inset="true">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview">';
					res= item.resp;
				}
			}
			html = html + '<li><a onClick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
		$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSVencidasP.html\#consulta_osp";
	});	
}

/* Obtiene la lista de las Tareas que puede visualizar el usuario logueado, cuya fecha límite sea igual a la fecha del sistema, ordenadas segun su prioridad
 * 20120622 MT
 */
function cargarTareasHoyP(){
	var res = '';
	var html = '<div data-role="content" align="center"><div data-role="content" align="center"><div data-role="collapsible-set"><div data-role="collapsible" data-collapsed="true" data-theme="b">';
	$.getJSON("http://nube4u.com/sid_servicios/json/listaOSHoyP.php?jsoncallback=?", {usuario:localStorage.nombre}, function(data) {	
		$.each(data, function(i, item) {
			if (res != item.resp) {
				if(res == ''){
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				} else{
					html+= '</ul></p></div><div data-role="collapsible" data-collapsed="true" data-theme="b">';
					html+= '<h3>'+ item.resp +' ('+item.cant+') </h3><p><ul data-role="listview" data-inset="true">';
					res= item.resp;
				}
			}
			html = html + '<li><a onClick="consultarTarea(' + item.sec + ')" id="' + item.sec + '"> TAREA #'+item.sec+'</a><p></p><p> '+item.id+'; '+ item.resp+ '; ' + item.estatus +'</p></li>';	
		});
		html = html + '</ul></p></div></div></div></div>';
		$(html).appendTo("#tareas");
		res='';
		location.href="ConsultaOSHoyP.html\#consulta_osp";
	});	
}


function guardarImagenes () {
	alert("A");
	ManipFiles();
}

function ManipFiles()
{
   alert ("iNICIO");
   var fso, f1, f2, s;
   fso = new ActiveXObject("Scripting.FileSystemObject");
   f1 = fso.CreateTextFile("c:\\archprue.txt", true);
   Response.Write("Escribir archivo <br>");
   // Escribir una línea.
   f1.Write("Esto es una prueba.");
   // Cerrar el archivo para la escritura.
   f1.Close();
   Response.Write("Mover archivo a c:\\tmp <br>");
   // Obtener un identificador para el archivo en la raíz de C:\.
   f2 = fso.GetFile("c:\\archprue.txt");
   // Mover el archivo al directorio \tmp.
   f2.Move ("c:\\tmp\\archprue.txt");
   Response.Write("Copiar archivo a c:\\temp <br>");
   // Copiar el archivo a \temp.
   f2.Copy ("c:\\temp\\archprue.txt");
   Response.Write("Eliminar archivos <br>");
   // Obtener identificadores para la ubicación actual de los archivos.
   f2 = fso.GetFile("c:\\tmp\\archprue.txt");
   f3 = fso.GetFile("c:\\temp\\archprue.txt");
   // Eliminar los archivos.
   //f2.Delete();
   //f3.Delete();
   //Response.Write("Terminado");
   alert ("Terminado");
}

/*********************************************************************************************************************************/
/*****                                               FUNCIONES - Alejandra Martini                                           *****/
/*****                                                 		MÓDULO PROYECTO  												 *****/
/*********************************************************************************************************************************/

/* Función que muestra el formulario para reasignar la tarea al nuevo responsable 
 * 20120807 Alejandra
 */
function reasignarTarea(tarea){
	localStorage.tarea = tarea;
	location.href="ReasignarTarea.html";
}

/* Función que redirecciona al url ReasignarTarea.html y almacena en localStorage la tarea pasada por parametro 
 * 20120807 Alejandra
 */
function cargarDatosTareaResponsable(){
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Reasignar Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+tarea+'" readonly/>';
		
	jQuery.get("http://corprocessu.com:8000/preReasignarTarea/"+tarea,function(resultado){
		data = jQuery.parseJSON(resultado);
		$.each(data, function(i, elemento){
			if(i==0){
				html += '<label for="id">Tarea: </label><input type="text" name="id" id="id" value="'+elemento.id+'" readonly/>';
				html += '<label for="obs">Observación:</label><textarea cols="40" rows="8" name="obs" id="obs" onChange="almacenarObs()"> </textarea>';
				html += '<label for="selectResponsable" class="select">Responsable:</label><select name="selectResponsable" id="selectResponsable" data-theme="b"><option value="">Seleccionar</option>';	
			}else{
				html+='<option value="Responsable '+1+'">'+elemento.usr+'</option>';
			}
		});
		html += '</select><br><br/><button onclick="reasignarRespTarea()" value="Reasignar" name="envia" data-theme="b"></button><br>';
				
		$(html).appendTo("#images_reasignar");
		location.href="ReasignarTarea.html\#reasignar_tarea";
	});
			
}

/* Almacena en el localStorage el nuevo responsable
 * 20120809 Alejandra
 */
function almacenarObs() {
	localStorage.obs = document.getElementById("obs").value.toUpperCase();
}

/* Guarda en la base de datos un tracking con los datos suministrados por la funcion ingresarTrack
 * 20120807 Alejandra
 */
function reasignarRespTarea(){
	x = document.getElementById("selectResponsable").selectedIndex;
	y = document.getElementById("selectResponsable").options;
	if(localStorage.obs!=''){
		if(y[x].index!=0){
			localStorage.respi = y[x].text;
			jQuery.get("http://corprocessu.com:8000/reasignarTarea/"+localStorage.tarea+"/"+localStorage.respi+"/"+localStorage.obs+"/"+localStorage.nombre,function(resultado){
				data = jQuery.parseJSON(resultado);
				localStorage.obs='';
				location.href="DetalleTarea.html";
			});
		}else{
			alert("Debe seleccionar el nuevo usuario responsable");	
		}
	}else{
		alert("Debe añadir una observación");	
	}
}

/* Obtiene la lista de los Proyectos que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'A'
 * 20120807 Alejandra
 */
function cargarProyectosAbiertos(){
	var html = '<div data-role="content" align="center">';
	html = html + '<p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaProyAoC/"+localStorage.nombre+"/A",function(resultado){
		data = jQuery.parseJSON(resultado);
		$.each(data, function(i, elemento){
			html = html + '<li><a onClick="consultarProyecto(' + elemento.sec + ')" id="' + elemento.sec + '">('+elemento.sec+') '+elemento.id+'<br></br><p>'+elemento.empinst+'; ABIERTO</p></a></li>'; 
		});
		html = html + '</ul></p></div>';
		$(html).appendTo("#proyectos");
		location.href="ConsultaProyAbiertos.html\#consulta_proy";
	});
}

/* Obtiene la lista de los Proyectos que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'C'
 * 20120807 Alejandra
 */
function cargarProyectosCerrados(){
	var html = '<div data-role="content" align="center">';
	html = html + '<p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaProyAoC/"+localStorage.nombre+"/C",function(resultado){
		data = jQuery.parseJSON(resultado);
		$.each(data, function(i, elemento){
			html = html + '<li><a onClick="consultarProyecto(' + elemento.sec + ')" id="' + elemento.sec + '">('+elemento.sec+') '+elemento.id+'<br></br><p>'+elemento.empinst+'; CERRADO</p></a></li>'; 
		});
		html = html + '</ul></p></div>';
		$(html).appendTo("#proyectos");
		location.href="ConsultaProyCerrados.html\#consulta_proy";
	});
}

/* Función que guarda en el localstorage de html5 el unicode del proyecto a consultar, y redirecciona a la página DetalleProyecto.html
 * 20120807 Alejandra
 */
function consultarProyecto(proy) {
	localStorage.proy = proy;
	var htmlh = '<h1>Proyecto # '+ proy + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="DetalleProyecto.html";
}

/* Obtiene los datos del proyecto a consultar
 * 20120807 Alejandra
 */
function cargarDetallesProyecto() {
	var proy = localStorage.proy;
	var htmlh = '<h1>Proyecto # '+ proy + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	// btn de PRODUCTO
	
	var html = '<div data-role="content"><div data-role="controlgroup" data-type="horizontal" align="center"><a onclick= "redireccionar(\'ConsultaProdAbiertos.html\')" data-role="button" data-theme="b">Productos</a><a onclick = "redireccionar(\'DetalleRRHHProyecto.html\')" data-role="button" data-theme="b">Consultar RRHH</a></div>';
	
	jQuery.get("http://corprocessu.com:8000/listaProyDetalle/"+proy,function(resultado){
		data = jQuery.parseJSON(resultado);
		$.each(data, function(i, elemento){					
			html = html + '<label for="id">Empinst: </label><input type="text" name="id" id="id" value="'+elemento.empinst+'" readonly/>';
			html = html + '<label for="id">Proyecto: </label><input type="text" name="id" id="id" value="'+elemento.id+'" readonly/>';
			html = html + '<label for="id">Proyecto Detalle: </label><textarea cols="40" rows="8" name="id" id="id" readonly>'+elemento.descripcion+'</textarea>';
			html = html + '<label for="id">Líder: </label><input type="text" name="id" id="id" value="'+elemento.lider+'" readonly/>';
			html = html + '<label for="id">Estatus de Avance: </label><input type="text" name="id" id="id" value="'+elemento.estatus_absoluto+'" readonly/>';
		});
		html = html + '</div>';
		$(html).appendTo("#detalleProyecto");
		location.href="DetalleProyecto.html\#detalle_proyecto";
	});
}

/* Obtiene la lista de los Productos que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'A'
 * 20120807 Alejandra
 */
function cargarProductosAbiertos(){
	var html = '<div data-role="content" align="center">';
	html = html + '<p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaProdAoC/"+localStorage.proy+"/A",function(resultado){
		data = jQuery.parseJSON(resultado);
		$.each(data, function(i, elemento){
			html = html + '<li><a onClick="consultarProducto(' + elemento.sec + ')" id="' + elemento.sec + '">('+elemento.sec+') '+elemento.id+'<br></br><p>'+elemento.empinst+'; ABIERTO</p></a></li>';  
		});
		html = html + '</ul></p></div>';
		$(html).appendTo("#productos");
		location.href="ConsultaProdAbiertos.html\#consulta_prod";
	});
}

/* Obtiene la lista de los Productos que puede visualizar el usuario logueado, siempre que su estatus absoluto sea 'C'
 * 20120807 Alejandra
 */      
function cargarProductosCerrados(){
	var html = '<div data-role="content" align="center">';
	html = html + '<p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaProdAoC/"+localStorage.proy+"/C",function(resultado){
		data = jQuery.parseJSON(resultado);
		$.each(data, function(i, elemento){
			html = html + '<li><a onClick="consultarProducto(' + elemento.sec + ')" id="' + elemento.sec + '">('+elemento.sec+') '+elemento.id+'<br></br><p>'+elemento.empinst+'; CERRADO</p></a></li>'; 
 
		});
		html = html + '</ul></p></div>';
		$(html).appendTo("#productos");
		location.href="ConsultaProdCerrados.html\#consulta_prod";
	});
}

/* Función que redirecciona al url DetalleProducto.html y almacena en localStorage el producto pasado por parametro 
 * 20120808 Alejandra
 */
function consultarProducto(prod) {
	localStorage.prod = prod;
	var htmlh = '<h1>Detalle Producto # '+ prod + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="DetalleProducto.html";
}

/* Obtiene los datos del producto a consultar
 * 20120808 Alejandra
 */
function cargarDetallesProducto() {
	var prod = localStorage.prod;
	var htmlh = '<h1>Detalle Producto # '+ prod + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	// btn de Reasignar
	var html = '<div data-role="content"><div data-role="controlgroup" data-type="horizontal" align="center"><a onclick= "redireccionar(\'ReasignarProducto.html\')" data-role="button" data-theme="b">Reasignar</a></div>';
	
	jQuery.get("http://corprocessu.com:8000/listaProdDetalle/"+prod,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){	
	
		html = html + '<label for="id">Empinst: </label><input type="text" name="id" id="id" value="'+elemento.empinst+'" readonly/>';
		html = html + '<label for="id">Proyecto: </label><input type="text" name="id" id="id" value="'+elemento.proy+'" readonly/>';
		html = html + '<label for="id">Fase: </label><input type="text" name="id" id="id" value="'+elemento.fase+'" readonly/>';
		html = html + '<label for="id">Responsable: </label><input type="text" name="id" id="id" value="'+elemento.resp+'" readonly/>';
		html = html + '<label for="id">Producto: </label><input type="text" name="id" id="id" value="'+elemento.id+'" readonly/>';		
		html = html + '<label for="id">Producto Detalle: </label><textarea cols="40" rows="8" name="id" id="id" readonly>'+elemento.desc+'</textarea>';
		html = html + '<label for="id">Estatus de Avance: </label><input type="text" name="id" id="id" value="'+elemento.estatus+'" readonly/>';
		html = html + '<label for="id">Factor de Ponderación ()%: </label><input type="text" name="id" id="id" value="'+elemento.fp+'" readonly/>';
		html = html + '<label for="id">Horas Presupuesto Producto: </label><input type="text" name="id" id="id" value="'+elemento.hp+'" readonly/>';
		});
		
	html = html + '</div>';
	$(html).appendTo("#detalleProducto");
	location.href="DetalleProducto.html\#detalle_producto";
	});
}

/* Función que redirecciona al url ReasignarProducto.html y almacena en localStorage el producto pasado por parametro 
 * 20120807 Alejandra
 */
function cargarDatosProdResponsable(){
	
	var prod = localStorage.prod;
	var htmlh = '<h1>Reasignar Producto # '+ prod + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<label for="id">Producto: </label><input type="text" name="id" id="id" value="'+prod+'" readonly/>';
		
	jQuery.get("http://corprocessu.com:8000/preReasignarProducto/"+prod,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		if(i==0){
				html += '<label for="id">Producto: </label><input type="text" name="id" id="id" value="'+elemento.id+'" readonly/>';
				html += '<label for="obs">Observación:</label><textarea cols="40" rows="8" name="obs" id="obs" onChange="almacenarObs()"> </textarea>';
				html += '<label for="selectResponsable" class="select">Responsable:</label><select name="selectResponsable" id="selectResponsable" data-theme="b"><option value="">Seleccionar</option>';	
			}else{
				html+='<option value="Responsable '+i+'">'+elemento.usr+'</option>';
			}
		});	
		html += '</select><br><br/><button onclick="reasignarRespProd()" value="Reasignar" name="envia" data-theme="b"></button><br>';
		$(html).appendTo("#images_reasignar");
		location.href="ReasignarProducto.html\#reasignar_producto";
	});
}

/* Guarda en la base de datos un tracking con los datos suministrados por la funcion ingresarTrack
 * 20120808 Alejandra
 */
function reasignarRespProd(){
	x = document.getElementById("selectResponsable").selectedIndex;
	y = document.getElementById("selectResponsable").options;
	if(localStorage.obs!=''){
		if(y[x].index!=0){
			localStorage.respi = y[x].text;
			jQuery.get("http://corprocessu.com:8000/reasignarProducto/"+localStorage.prod+"/"+localStorage.respi+"/"+localStorage.obs+"/"+localStorage.nombre,function(resultado){
				data = jQuery.parseJSON(resultado);
				localStorage.obs='';
				location.href="DetalleProducto.html";
			});
		}else{
			alert("Debe seleccionar el nuevo usuario responsable");	
		}
	}else{
		alert("Debe añadir una observación");	
	}
}


/* Guarda en el localstorage de html5 el unicode de la tarea a consultar sus RRHH, y redirecciona a la página DetalleRRHHTarea.html
 * 20120808 Alejandra Martini
 */
function consultarRRHHtarea(tarea){
	localStorage.tarea = tarea;
	var htmlh = '<h1>Consulta RRHH - Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="DetalleRRHHTarea.html";
}

/* Obtiene los datos de los recursos humanos de la tarea
 * 20120808 Alejandra Martini
 */
function cargarTareaRRHH() {
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Consulta RRHH - Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<div data-role="content"><div data-role="controlgroup" data-type="horizontal" align="center"><a onclick="redireccionar(\'agregarRRHHtarea.html\')" data-role="button" data-theme="b">Agregar</a></div>';
	
	html = html + '<p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaRecursosT/"+tarea,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		html = html + '<li>'+elemento.rrhh+'</br><br><p>'+elemento.rol+'</p></a></li>';
		});
		html = html + '</ul></p></div>';
		$(html).appendTo("#detalleTareaRRHH");
		location.href="DetalleRRHHTarea.html\#detalle_tareaRRHH";
	});
}

/* Función que muestra el formulario para agregar un nuevo RRHH
 * 20120808 Alejandra Martini
 */
function cargarDatosRRHH_t() {
	var tarea = localStorage.tarea;
	var htmlh = '<h1>Agregar RRHH - Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<div data-role="content">';
			html += '<label for="selectRRHH" class="select">RRHH:</label><select name="selectRRHH" id="selectRRHH" data-theme="b"><option value="">Seleccionar</option>' ;	
		jQuery.get("http://corprocessu.com:8000/selectTareaRRHH/"+tarea,function(resultado){
		jQuery.get("http://corprocessu.com:8000/selectRoles/"+tarea,function(resultado2){
		data = jQuery.parseJSON(resultado);
		data2 = jQuery.parseJSON(resultado2);
		$.each(data, function(i, elemento){
			html+='<option value="RRHH '+elemento.rrhh+'">'+elemento.rrhh+'</option>';
			});				
			html += '</select><label for="selectRol" class="select">Rol:</label><select name="selectRol" id="selectRol" data-theme="b"><option value="">Seleccionar</option>';
		$.each(data2, function(i, elemento){		
			html+='<option value="Rol '+elemento.rol+'">'+elemento.rol+'</option>';
			});
		html = html + '</select><br></br><a onclick="agregarRRHHtarea()" data-role="button" data-theme="b">Agregar</a></div>';
		$(html).appendTo("#detalleRRHH");
		location.href="agregarRRHHtarea.html\#detalle_RRHH";
		
		});});
}

/* Función que agrega un nuevo RRHH a la tarea
 * 20120813 Alejandra
 */
function agregarRRHHtarea() {
	var tarea = localStorage.tarea;
	var usr = localStorage.nombre;
	var rrhh;
	var rol;
	
	x = document.getElementById("selectRRHH").selectedIndex;
	rrhh_ = document.getElementById("selectRRHH").options;
	
	y = document.getElementById("selectRol").selectedIndex;
	rol_ = document.getElementById("selectRol").options;
	

	if(rrhh_[x].index!=0 && rol_[y].index!=0){
		rrhh = rrhh_[x].text;
		rol = rol_[y].text;
		location.href="DetalleRRHHTarea.html";
		jQuery.get("http://corprocessu.com:8000/insertarRRHHtarea/"+tarea+"/"+usr+"/"+rrhh+"/"+rol,function(resultado){
		});				
	}else{
		alert("Debe seleccionar el RRHH y el Rol a asignar");
	}	
}


/* Guarda en el localstorage de html5 el unicode de la tarea a consultar sus RRHH, y redirecciona a la página DetalleRRHHProyecto.html
 * 20120808 Alejandra Martini
 */
function consultarRRHHProy(proy){
	localStorage.proy = proy;
	var htmlh = '<h1>Consulta RRHH - Proyecto # '+ proy + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="DetalleRRHHProyecto.html";
}

/* Obtiene los datos de los recursos humanos del proyecto
 * 20120810 Alejandra Martini
 */
function cargarProyRRHH() {
	var proy = localStorage.proy;
	var htmlh = '<h1>Consulta RRHH - Proyecto # '+ proy + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<div data-role="content"><div data-role="controlgroup" data-type="horizontal" align="center"><a onclick="redireccionar(\'agregarRRHHproy.html\')" data-role="button" data-theme="b">Agregar</a></div>';
	
	html = html + '<p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaRecursosP/"+proy,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		html = html + '<li>'+elemento.rrhh+'</br><br><p>'+elemento.rol+'</p></a></li>';
		});
		html = html + '</ul></p></div>';
		$(html).appendTo("#detalleProyRRHH");
		location.href="DetalleRRHHProyecto.html\#detalle_proyRRHH";
	});
}

/* Función que muestra el formulario para agregar un nuevo RRHH
 * 20120808 Alejandra Martini
 */
function cargarDatosRRHH_P() {
	var proy = localStorage.proy;
	var htmlh = '<h1>Agregar RRHH - Proyecto # '+ proy + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	var html = '<div data-role="content">';
			html += '<label for="selectRRHH" class="select">RRHH:</label><select name="selectRRHH" id="selectRRHH" data-theme="b"><option value="">Seleccionar</option>' ;	
		jQuery.get("http://corprocessu.com:8000/selectProyRRHH/"+proy,function(resultado){
		jQuery.get("http://corprocessu.com:8000/selectRoles/"+proy,function(resultado2){
		data = jQuery.parseJSON(resultado);
		data2 = jQuery.parseJSON(resultado2);
		$.each(data, function(i, elemento){
			html+='<option value="RRHH '+elemento.rrhh+'">'+elemento.rrhh+'</option>';
			});				
			html += '</select><label for="selectRol" class="select">Rol:</label><select name="selectRol" id="selectRol" data-theme="b"><option value="">Seleccionar</option>';
		$.each(data2, function(i, elemento){		
			html+='<option value="Rol '+elemento.rol+'">'+elemento.rol+'</option>';
			});
		html = html + '</select><br></br><a onclick="agregarRRHHproy()" data-role="button" data-theme="b">Agregar</a></div>';
		$(html).appendTo("#detalleRRHH");
		location.href="agregarRRHHproy.html\#detalle_RRHH";
		
		});});
}

/* Función que agrega un nuevo RRHH al proyecto
 * 20120813 Alejandra
 */
function agregarRRHHproy() {
	var proy = localStorage.proy;
	var usr = localStorage.nombre;
	var rrhh;
	var rol;
	
	x = document.getElementById("selectRRHH").selectedIndex;
	rrhh_ = document.getElementById("selectRRHH").options;
	
	y = document.getElementById("selectRol").selectedIndex;
	rol_ = document.getElementById("selectRol").options;
	

	if(rrhh_[x].index!=0 && rol_[y].index!=0){
		rrhh = rrhh_[x].text;
		rol = rol_[y].text;
		location.href="DetalleRRHHProyecto.html";
		jQuery.get("http://corprocessu.com:8000/insertarRRHHproy/"+proy+"/"+usr+"/"+rrhh+"/"+rol,function(resultado){
		});				
	}else{
		alert("Debe seleccionar el RRHH y el Rol a asignar");
	}	
	
}

/* Obtiene la lista de Proyectos que puede visualizar el usuario logueado por ser lider o RRHH del mismo, siempre que su estatus absoluto sea 'A'.
 * 20120815 Alejandra Martini
 */
function cargarEstadisticasProy(){
	var html = '';	
	
	jQuery.get("http://corprocessu.com:8000/listaEstProy/"+localStorage.nombre,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		if (elemento.tam == 7) {
			html += '<li><a onClick="consultaEstadisticasProy_proy('+elemento.sec+',\''+elemento.id+'\')" id="proy '+ i +'">'+elemento.id+'</a><br></br><p>%L: '+elemento.logro+'; %G: '+elemento.gasto+'; %GI: '+elemento.gastoInt+'; RT: '+elemento.rt+'; '+elemento.cliente+'</p></li>';
		}else if(elemento.tam == 3){
			if(elemento.lista == 1){
				html += '<div data-role="collapsible-set">';
			}else{
				html += '</ul></p></div>';
			}
			html += '<div data-role="collapsible" data-collapsed="true" data-theme="b"><h3>'+elemento.op+' ('+elemento.cant+') </h3><p><ul data-role="listview" data-inset="true">';
		}else{
			html1 = '<p>Tiene asignados '+elemento.cant+' proyectos</p>';
			$(html1).appendTo("#cant_proy");
		}
		});
		if(html==''){
			html += '<p>Tiene asignados 0 proyectos</p>';
		}else{
			html += '</ul></p></div></div>';
		}
			
		$(html).appendTo("#proyectos");
		location.href="EstadisticasProy.html\#consulta_proy";
	});			
}

/* Obtiene la lista de Productos que puede visualizar el usuario logueado por ser responsable del producto, RRHH producto, lider del proyecto asociado o RRHH del proyecto asociado, siempre que su estatus absoluto sea 'A'.
 * 20120815 Alejandra Martini
 */
function cargarEstadisticasProd(){
	var html = '';	
	localStorage.atras = "EstadisticasProd.html";
	
	jQuery.get("http://corprocessu.com:8000/listaEstProd/"+localStorage.nombre,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		if (elemento.tam == 8) {
			html += '<li><a onClick="consultaEstadisticasProd_proy('+elemento.sec+',\''+elemento.id+'\')" id="prod '+ i +'">'+elemento.id+'</a><br></br><p>'+elemento.resp+'</p><p>FP: '+elemento.fp+'; %L: '+elemento.logro+'; %G: '+elemento.gasto+'; %GI: '+elemento.gastoInt+'; RT: '+elemento.rt+'</p></li>';
		}else if(elemento.tam == 3){
			if(elemento.lista == 1){
				html += '<div data-role="collapsible-set">';
			}else{
				html += '</ul></p></div>';
			}
			html += '<div data-role="collapsible" data-collapsed="true" data-theme="b"><h3>'+elemento.op+' ('+elemento.cant+') </h3><p><ul data-role="listview" data-inset="true">';
		}else{
			html1 = '<p>Tiene asignados '+elemento.cant+' productos</p>';
			$(html1).appendTo("#cant_prod");
		}
		});
		if(html==''){
			html += '<p>Tiene asignados 0 productos</p>';
		}else{
			html += '</ul></p></div></div>';
		}
			
		$(html).appendTo("#productos");
		location.href="EstadisticasProd.html\#consulta_prod";
	});			
}

/* Obtiene la lista de Proyectos que puede visualizar el usuario logueado por ser lider o RRHH del mismo, siempre que su estatus absoluto sea 'A'.
 * 20120815 Alejandra Martini
 */
function cargarEstadisticasTarea(){
	var html = '';
	localStorage.atras = "EstadisticasTarea.html";
	
	jQuery.get("http://corprocessu.com:8000/listaEstTarea/"+localStorage.nombre,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		if (elemento.tam == 8) {
			html += '<li><a onClick="consultaEstadisticasTarea_proy('+elemento.sec+',\''+elemento.id+'\', \''+elemento.resp+'\')" id="tarea '+ i +'">TAREA #'+elemento.sec+': '+elemento.id+'</a><br></br><p>'+elemento.resp+'</p><p>FP: '+elemento.fp+'; %L: '+elemento.logro+'; %G: '+elemento.gasto+'; %GI: '+elemento.gastoInt+'; RT: '+elemento.rt+'</p></li>';
		}else if(elemento.tam == 3){
			if(elemento.lista == 0){
				html += '<div data-role="collapsible-set">';
			}else{
				html += '</ul></p></div>';
			}
			html += '<div data-role="collapsible" data-collapsed="true" data-theme="b"><h3>'+elemento.op+' ('+elemento.cant+') </h3><p><ul data-role="listview" data-inset="true">';
		}else{
			html1 = '<p>Tiene asignadas '+elemento.cant+' tareas</p>';
			$(html1).appendTo("#cant_tarea");
		}
		});
		if(html==''){
			html += '<p>Tiene asignadas 0 tareas</p>';
		}else{
			html += '</ul></p></div></div>';
		}
			
		$(html).appendTo("#tareas");
		location.href="EstadisticasTarea.html\#consulta_tarea";
	});			
}

/* Función que guarda en el localstorage de html5 el unicode del proyecto a consultar, y redirecciona a la página cargarEstProy.html
 * 20120820 Alejandra Martini
 */
function consultaEstadisticasProy_proy(proy,proy_id) { 
	localStorage.proy = proy;
	localStorage.proy_id = proy_id;
	var htmlh = '<h1>Proyecto # '+ proy + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="CargarEstProy.html";
}

/* Obtiene el estatus del proyecto y la lista de productos q le corresponden.
 * 20120820 Alejandra Martini
 */
function cargarEstProy_proy(){
	proy = localStorage.proy;
	proy_id = localStorage.proy_id;
	
	htmlh = '<h1>Proyecto # '+ proy + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	// *** DETALLES PROYECTO ***
	// Codigo para el listado de las fases y sus estadisticos
	html = '<div data-role="collapsible-set">'
	html += '<div data-role="collapsible" data-collapsed="true" data-theme="b"><h3>Fases</h3><p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaFases_Est/"+proy,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		if(elemento.lista == 1){
			html += '<li><a onClick="consultaEstadisticasFase_proy('+elemento.sec+',\''+elemento.id+'\')" id="fase '+ i +'">'+elemento.id+'<br></br><p>FP: '+elemento.fp+'; %L: '+elemento.logro+'; %G: '+elemento.gasto+'; %GI: '+elemento.gastoI+'; RT: '+elemento.rt+'</p></a></li>';
		}else{
			// *** ESTATUS PROYECTO ***
			// Codigo para la representación de graficos de un proyecto
				
			// GRAFICO: %Gasto vs %Logro 			
			graficoGL(elemento.gasto,elemento.logro)			

			// GRAFICO: Rendimiento 
			graficoRendimiento(elemento.rendimiento, "del Proyecto")
			 
			// GRAFICO: Gauge - RT 		
			graficoRT(elemento.rt)			
			
			//-Grafico reloj - Balance de Horas ------------ //
			graficoBT(elemento.hp,elemento.hpex,elemento.hc)
			
			// *** EVENTOS - Msjs de AYUDA *** //
			
			document.getElementById("rt_Gauge").onmousedown_rgraph = function (e){
				var canvas = document.getElementById("rt_ayuda");
				var txt = 'Fecha Inicio: '+elemento.fecha_ini+'\nFecha Final: '+elemento.fecha_fin;
				ayuda_act(canvas,0,txt,80);
			} 
	
			document.getElementById("bt_Reloj").onmousedown_rgraph = function (e){
				var canvas = document.getElementById("bt_ayuda");
				var txt = 'HP: '+elemento.hp+'\nHPEx: '+elemento.hpex+'\nHC: '+elemento.hc+'\nBT(HP-HC): '+elemento.bt+'\n%GastoP: '+elemento.gasto+'\n%GastoT: '+elemento.gastoInt;
				ayuda_act(canvas,1,txt,60);
			}
			 
			document.getElementById("hprogress1").onmousedown_rgraph = function (e){
				var canvas = document.getElementById("hp1_ayuda");
				var txt = '                    Tareas Totales: '+elemento.tarT+'  |  Tareas Completadas: '+elemento.tarC;
				ayuda_act(canvas,2,txt,15);
			}  
		}
		});
		html += '</ul></p></div></div>';
		$(html).appendTo("#lista_fase");
		
		html2 = '<hr/><h4><p>PROYECTO: '+proy_id+'</p></h4><hr/>'		
		$(html2).appendTo("#datos_proy");
		
		location.href="CargarEstProy.html\#estadistica_proy";
	});
}

/* Función que guarda en el localstorage de html5 el unicode del proyecto a consultar, y redirecciona a la página cargarEstFase.html
 * 20120820 Alejandra Martini
 */
function consultaEstadisticasFase_proy(fase,fase_id){ 
	localStorage.fase = fase;
	localStorage.fase_id = fase_id;
	var htmlh = '<h1>Fase # '+ fase + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="CargarEstFase.html";
}

/* Obtiene la lista de productos q le corresponden.
 * 20120820 Alejandra Martini
 */
function cargarEstFase_proy(){
	fase = localStorage.fase;
	proy = localStorage.proy;
	proy_id = localStorage.proy_id;
	
	htmlh = '<h1>Fase # '+ fase + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	// *** DETALLES FASE ***
	// Codigo para el listado de las fases y sus estadisticos
	//html = '<p>Proyecto #'+proy+': '+localStorage.proy_id+'</p>'
	html = '<hr/><h4>PROYECTO #'+proy+': '+proy_id+'</h4><hr/><div data-role="collapsible-set">'
	html += '<div data-role="collapsible" data-collapsed="true" data-theme="b"><h3>Productos</h3><p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaProd_Est/"+proy+"/"+fase,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		html += '<li><a onClick="consultaEstadisticasProd_proy('+elemento.sec+',\''+elemento.id+'\')" id="fase '+ i +'">'+elemento.id+'<br></br><p>'+elemento.resp+'</p><p>FP: '+elemento.fp+'; %L: '+elemento.logro+'; %G: '+elemento.gasto+'; %GI: '+elemento.gastoI+'; RT: '+elemento.rt+'</p></a></li>';
		});
		html += '</ul></p></div></div>';
		$(html).appendTo("#lista_prod");
		location.href="CargarEstFase.html\#estadistica_fase";
	});
}

/* Función que guarda en el localstorage de html5 el unicode del producto a consultar, y redirecciona a la página cargarEstProd.html
 * 20120820 Alejandra Martini
 */
function consultaEstadisticasProd_proy(prod) { 
	localStorage.prod = prod;
	var htmlh = '<h1>Producto # '+ prod + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="CargarEstProd.html";
}

/* Obtiene el estatus del producto y la lista de tareas que le corresponden.
 * 20120820 Alejandra Martini
 */      
function cargarEstProd_proy(){
	prod = localStorage.prod;
		
	htmlh = '<h1>Producto # '+ prod + '</h1>';
	$(htmlh).appendTo("#headertarea2");
	
	// *** DETALLES PRODUCTO ***
	// Codigo para el listado de las fases y sus estadisticos
	html = '<div data-role="collapsible-set">'
	html += '<div data-role="collapsible" data-collapsed="true" data-theme="b"><h3>Tareas</h3><p><ul data-role="listview" data-inset="true">';
	
	jQuery.get("http://corprocessu.com:8000/listaTarea_Est/"+prod,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		if(elemento.lista == 1){
			if(elemento.sec != "title"){
				html += '<li><a onClick="consultaEstadisticasTarea_proy('+elemento.sec+',\''+elemento.id+'\',\''+elemento.resp+'\')" id="tarea '+ i +'">TAREA #'+elemento.sec+': '+elemento.id+'<br></br><p>'+elemento.resp+'</p><p>FP: '+elemento.fp+'; %L: '+elemento.logro+'; %G: '+elemento.gasto+'; %GI: '+elemento.gastoI+'; RT: '+elemento.rt+'</p></a></li>';
			}else{
				html_t = '<hr/><h4><p>PROYECTO #'+elemento.proy+': '+elemento.proy_id+'</p><p>'+elemento.fase_id+'</p></h4><hr/>'
			}
		}else{					
			// *** ESTATUS PRODUCTO ***
			// Codigo para la representación de graficos
			
			// GRAFICO: %Gasto vs %Logro 			
			graficoGL(elemento.gasto,elemento.logro)			

			// GRAFICO: Rendimiento 
			graficoRendimiento(elemento.rendimiento, "del Producto")
			 
			// GRAFICO: Gauge - RT 		
			graficoRT(elemento.rt)			
			
			//-Grafico reloj - Balance de Horas ------------ //
			graficoBT(elemento.hp,elemento.hpex,elemento.hc)
			
			// *** EVENTOS - Msjs de AYUDA *** //
			
			document.getElementById("rt_Gauge").onmousedown_rgraph = function (e){
				var canvas = document.getElementById("rt_ayuda");
				var txt = 'Fecha Inicio: '+elemento.fecha_ini+'\nFecha Final: '+elemento.fecha_fin;
				ayuda_act(canvas,0,txt,80);
			} 
	
			document.getElementById("bt_Reloj").onmousedown_rgraph = function (e){
				var canvas = document.getElementById("bt_ayuda");
				var txt = 'HP: '+elemento.hp+'\nHPEx: '+elemento.hpex+'\nHC: '+elemento.hc+'\nBT(HP-HC): '+elemento.bt+'\n%GastoP: '+elemento.gasto+'\n%GastoT: '+elemento.gastoInt;
				ayuda_act(canvas,1,txt,60);
			}  
			 
			document.getElementById("hprogress1").onmousedown_rgraph = function (e){
				var canvas = document.getElementById("hp1_ayuda");
				var txt = '                    Tareas Totales: '+elemento.tarT+' | Tareas Completadas: '+elemento.tarC;
				ayuda_act(canvas,2,txt,15);
			} 
		}
		});		
		html += '</ul></p></div></div>';
		$(html).appendTo("#lista_tarea");
		$(html_t).appendTo("#datos_prod");
		location.href="CargarEstProd.html\#estadistica_prod";
	});
}

/* Función que guarda en el localstorage de html5 el unicode del producto a consultar, y redirecciona a la página cargarEstProd.html
 * 20120821 Alejandra Martini
 */
function consultaEstadisticasTarea_proy(tarea, tarea_id, tarea_resp) { 
	localStorage.tarea = tarea;
	localStorage.tarea_id = tarea_id;
	localStorage.tarea_resp = tarea_resp;
	var htmlh = '<h1>Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea1");
	location.href="CargarEstTarea.html";
}

/* Obtiene el estatus del producto y la lista de tareas que le corresponden.
 * 20120828 Alejandra Martini
 */      
function cargarEstTarea_proy(){
	localStorage.llamador = 2;
	tarea = localStorage.tarea;
	tarea_id = localStorage.tarea_id;
	tarea_resp = localStorage.tarea_resp;
	
	htmlh = '<h1>Tarea # '+ tarea + '</h1>';
	$(htmlh).appendTo("#headertarea2");

	// *** DETALLES TAREA ***
	// Detalla el proy, fase y prod a los cuales pertenece la clase

	jQuery.get("http://corprocessu.com:8000/datosTarea_Est/"+tarea,function(resultado){
	data = jQuery.parseJSON(resultado);
	$.each(data, function(i, elemento){
		html = '<hr/><h4><p>PROYECTO #'+elemento.proy+': '+elemento.proy_id+'</p><p>'+elemento.fase_id+'</p><p>PRODUCTO #'+elemento.prod+': '+elemento.prod_id+'</p></h4><p>TAREA: '+tarea_id+'</p><p>RESPONSABLE: '+tarea_resp+'</p><hr/>'	
		
		html += '<div data-role="controlgroup" data-type="horizontal" align="center"><a onclick="cargarTrkTarea(' + tarea + ')" data-role="button" data-theme="b">Ver TRK</a><a onclick="ingresarTrk(' + tarea + ')" data-role="button" data-theme="b">Ingresar TRK</a></div>';
		$(html).appendTo("#lista_trk");	
		
		// *** ESTATUS TAREA ***
		// Codigo para la representación de graficos de una tarea
			
		// GRAFICO: %Gasto 
		graficoG(elemento.gasto)
	
		// GRAFICO: Rendimiento 
		graficoRendimiento(elemento.rendimiento, "de la Tarea")  
		
		// GRAFICO: Gauge - DR 	
		graficoDR(elemento.dr)
		
		// Grafico reloj - Balance de Horas 		
		graficoBT(elemento.hp,elemento.hpex,elemento.hc)
		
		
		// ---------- EVENTOS - Msjs de AYUDA -------- //
		
		document.getElementById("rt_Gauge").onmousedown_rgraph = function (e){
			var canvas = document.getElementById("rt_ayuda");
			var txt = 'Fecha Inicio: '+elemento.fecha_ini+'\nFecha Final: '+elemento.fecha_fin;
			ayuda_act(canvas,0,txt,80);
		} 

		document.getElementById("bt_Reloj").onmousedown_rgraph = function (e){
			var canvas = document.getElementById("bt_ayuda");
			var txt = 'HP: '+elemento.hp+'\nHPEx: '+elemento.hpex+'\nHC: '+elemento.hc+'\nBT(HP-HC): '+elemento.bt+'\n%GastoP: '+elemento.gasto+'\n%GastoT: '+elemento.gastoInt;
			ayuda_act(canvas,1,txt,60);
		} 
	
		});
		location.href="CargarEstTarea.html\#estadistica_tarea";	
	});
}

/* Función que grafica el %gasto de la tarea.
 * 20120829 Alejandra Martini
 */ 
function graficoG(gasto){	
	var strGasto = '%Gasto ('+gasto+')'
	var data = [gasto];
	if(gasto<=100)
		var progress1 = new RGraph.HProgress('hprogress1',data, 100);
	else
		var progress1 = new RGraph.HProgress('hprogress1',data, gasto);
	progress1.Set('chart.colors', ['red']);
	progress1.Set('chart.key', [strGasto]);
	progress1.Set('chart.units.post', '%');
	progress1.Set('chart.tickmarks.zerostart', true);
	progress1.Draw();
}

/* Función que grafica la relacion %logro vs %gasto.
 * 20120829 Alejandra Martini
 */ 
function graficoGL(gasto,logro){
	logro = eval(logro)
	gasto = eval(gasto)  
	var strGasto = '%Gasto ('+gasto+')'
	var strLogro = '%Logro ('+logro+')'
	if(gasto>=logro){
		var data = [parseFloat(logro), parseFloat(gasto) - parseFloat(logro)];
		var color = ['blue', 'red']
		var leyenda = [strLogro, strGasto]
	}else if(gasto<logro){
		var data = [parseFloat(gasto), parseFloat(logro) - parseFloat(gasto)];
		var color = ['red', 'blue']
		var leyenda = [strGasto, strLogro]
	}
	
	if(gasto<=100)
		var progress1 = new RGraph.HProgress('hprogress1',data, 100);
	else
		var progress1 = new RGraph.HProgress('hprogress1',data, gasto);
	progress1.Set('chart.colors', color);
	progress1.Set('chart.key', leyenda);
	progress1.Set('chart.units.post', '%');
	progress1.Set('chart.tickmarks.zerostart', true);
	progress1.Draw();
}

/* Función que grafica el rendimiento del proyecto, producto o tarea asociado(a).
 * 20120829 Alejandra Martini
 */ 
function graficoRendimiento(rendimiento,desc){
	// -- Editable --	
	var limite_rojo = 40
	var limite_amarillo = 60
	var limite_verde = 100 
	var titulo = 'Rendimiento '+desc
	// -- Fin editable --
	
	var data = [0, rendimiento];
	var color = '#06FC5C' // verde manzana
	var hprogress2 = new RGraph.HProgress('hprogress2',data, limite_verde);
	
	var color_grad = hprogress2.context.createLinearGradient(0,15,0,65);
	if(rendimiento<=limite_rojo){
		color = 'red';
	}else if(rendimiento>limite_rojo && rendimiento<=limite_amarillo){
		color = 'yellow';
	}
	color_grad.addColorStop(0.05, 'black');
	color_grad.addColorStop(0.5, color);
	color_grad.addColorStop(0.95, 'black');

	hprogress2.Set('chart.colors', [color, color]);
	hprogress2.Set('chart.key', [titulo]);
	hprogress2.Set('chart.tickmarks.zerostart', true);
	hprogress2.Set('chart.tickmarks.inner', true);
	hprogress2.Set('chart.margin', 5);
	hprogress2.Set('chart.strokestyle.inner', 'rgba(0,0,0,0)');
	hprogress2.Draw();
}

/* Función que grafica los dias de retardo del proyecto o producto.
 * 20120829 Alejandra Martini
 */ 
function graficoRT(rt){
	// -- Editable --
	var dir_aguja = rt
	var limite_max = 50
	
	if(dir_aguja>limite_max){
		limite_max = dir_aguja
	}
	// -- Fin editable --
	
	var cg = new RGraph.CornerGauge('rt_Gauge', 0,limite_max,dir_aguja);
	cg.Set('chart.colors.ranges', [[1, limite_max, 'red'], [0,1,'#000000']]);
	cg.Set('chart.value.text.units.pre', 'RT: ');
	cg.Set('chart.value.text.boxed', true); <!-- Cuadro Borde -->
	cg.Set('chart.value.text.size', 8);
	cg.Set('chart.value.text.font', 'Verdana');
	cg.Set('chart.value.text.bold', true);
	cg.Set('chart.value.text.decimals', 0);
	cg.Set('chart.shadow.offsetx', 3); <!-- Sombra -->
	cg.Set('chart.shadow.offsety', 3);
	cg.Draw();
}

/* Función que grafica los dias restasntes de la tarea.
 * 20120830 Alejandra Martini
 */ 
function graficoDR(dr){
	// -- Editable --
	var dir_aguja = dr
	var limite_max = 20
	var limite_min = -20
	
	if(dir_aguja<limite_min){		
		limite_min = dir_aguja
	}else if(dir_aguja>limite_max){
		limite_max = dir_aguja
	}
	// -- Fin editable --
	
	var cg = new RGraph.CornerGauge('rt_Gauge', limite_min,limite_max,dir_aguja);
	cg.Set('chart.colors.ranges', [[limite_min, -5, 'red'], [-5, 0, '#FFAD07'], [0,1,'#000000'], [1, 5, '#FFAD07'],[5, limite_max, '#06FC5C']]);
	cg.Set('chart.value.text.units.pre', 'DR: ');
	cg.Set('chart.value.text.boxed', true); <!-- Cuadro Borde -->
	cg.Set('chart.value.text.size', 8);
	cg.Set('chart.value.text.font', 'Verdana');
	cg.Set('chart.value.text.bold', true);
	cg.Set('chart.value.text.decimals', 0);
	cg.Set('chart.shadow.offsetx', 3); <!-- Sombra -->
	cg.Set('chart.shadow.offsety', 3);
	cg.Set('chart.title', true)
	cg.Draw();
}

/* Función que grafica la relacion entre hp, hpex y hc.
 * 20120829 Alejandra Martini
 */ 
function graficoBT(hp,hpex,hc){
	// -- Editable --
	var limite_verde = hp      // HP
	var limite_amarillo = limite_verde+hpex  // HPex
	var limite_rojo = limite_amarillo + 20     // Sobre tiempo
	var dir_aguja = hc		    // HC
	// -- Fin editable --
	
	var r1 = new RGraph.Meter('bt_Reloj', 0,limite_rojo,dir_aguja); 
	// 1,2difuminacion(blanco),3nitidez desde arriba,4,altura, 5tamaño
	r1.Set('chart.colors.ranges', [[0,limite_verde, RGraph.RadialGradient(r1, 200,175,70,175,175,20, '#06FC5C', 'white')],[limite_verde,limite_amarillo, RGraph.RadialGradient(r1, 200,175,70,175,175,20, 'yellow', 'white')], [limite_amarillo,limite_rojo, RGraph.RadialGradient(r1, 200,175,70,175,175,20, 'red', 'white')]]);
	r1.Draw();
	
	//  ** leyenda ** //
		var c=document.getElementById("bt_Desc");
		var ctx=c.getContext("2d");
		ctx.font="14px Verdana";
	
		var k = 15
		var yIni = 70
		
		ctx.fillStyle="black";
		ctx.fillText("HP",14,11+yIni);
		ctx.fillText("HPex",14,11 + k +yIni);
		ctx.fillText("HC",14,11 + k*2 +yIni);
		
		ctx.fillStyle="#06FC5C";
		ctx.fillRect(1,1+yIni,11,11);
		ctx.fillStyle="yellow";
		ctx.fillRect(1,1+k+yIni,11,11);
		
		// flecha
		ctx.beginPath ();
		
		var y = 11 + k*2 +yIni
		ctx.moveTo(1 ,y-3);
		ctx.lineTo(12,y-3);
		
		// (ptoInicio : x,y)
		ctx.moveTo(8,y-8);
		
		// (cortePuta: x,y - ptoFinal : x,y)
		ctx.quadraticCurveTo (13,y-3,8,y+2);
		
		ctx.strokeStyle = "black";
		ctx.stroke();ctx.stroke();
	//** fin leyenda **//
}

/* Función que grafica el porcentaje logro: tareas completadas del proy o prod asociado.
 * 20120829 Alejandra Martini
 */ 
function graficoLogro(logro){
	// -- Editable --
	var dir_aguja = logro	// %Logro
	// -- Fin editable --
	
	var r2 = new RGraph.Meter('l_Reloj', 0,100,dir_aguja);
	r2.Set('chart.colors.ranges', [[0,50, RGraph.RadialGradient(r2, 200,200,70,175,175,20, 'yellow', 'white')],[50,100, RGraph.RadialGradient(r2, 200,200,70,175,175,20, '#06FC5C', 'white')]]);
	r2.Draw();
}


/*********************************************************************************************************************************/
/*****                                                 FUNCIONES - Alvaro Parada                                             *****/
/*****                                                 		MÓDULO INVENTARIO												 *****/
/*********************************************************************************************************************************/

//Función que inicializa las variables necesarias para consultar Materiales
function PreConsultaArticulo(){
	localStorage.matcatid="";
	localStorage.matcat="";
	localStorage.CArt="";
	localStorage.CxA="";
	localStorage.almacenid="";
	redireccionar("ArticulosC.html");
	//ConsultarMatcat_n1();
}

function refrescar(arg,tipo){
	
	if(localStorage.CxA!=""){
		if(tipo=='a'){
			GuardarMatcat();
			local1(arg,tipo);
		}else if(tipo=='c'){
			GuardarComp();
			local1(arg,tipo);
		}
	}

}

function GuardarMatcat(){

	localStorage.matcatid=document.getElementById("matcat").value;
	dat=document.getElementById("listdata").options;
	$.each(dat,function(i,e){
		if(e.value==localStorage.matcatid){
			localStorage.matcat=e.title;
		}
	});
}

function GuardarComp(){

	localStorage.compid=document.getElementById("comp").value;
	dat=document.getElementById("listdata").options;
	$.each(dat,function(i,e){
		if(e.value==localStorage.compid){
			localStorage.comp=e.title;
		}
	});
}

function MatcatConsulta(){
		

	jQuery.get("http://corprocessu.com:8000/ConsultaMatcat/",function(resultado){
		miRes = jQuery.parseJSON(resultado);
		matcat = '<div data-role="fieldcontain"> <label for="matcat">Material:</label><input type="text" name="matcat" id="matcat" value="'+localStorage.matcatid+'" list="listdata" onChange="refrescar(\'ArticulosC.html\',\'a\')" ><datalist id="listdata">';
		$.each(miRes, function(i, elemento){
			matcat+= '<option title="'+elemento.sec+'" value="'+elemento.id+'">';			
		});
		matcat+= '</datalist></div>';
		$(matcat).appendTo('#dmatcat');

		var nro = 0;
		if(localStorage.CArt=='t'){
		
			jQuery.get("http://corprocessu.com:8000/ConsultaTodos/"+localStorage.matcat,function(resultado){
				miRes = jQuery.parseJSON(resultado);
				html='<div data-role="content" id="Art" aling="center"><ul data-role="listview" id="Restan"><li data-role="list-divider" role="heading"><h3>Disponible Por Almacen</h3></li>';
				$.each(miRes,function(i,elemento){
					html+='<li>'+elemento.id+' : '+elemento.num+'</li><li data-role="list-divider" role="heading"></li>';
					nro+=elemento.num;
				});
				html+='</ul></div>';
				$(html).appendTo("#ConsultaArt");
				html ='<div data-role="fieldcontain"><label for="textinput">Disponible:</label><input type="text" name="textinput" id="textinput" value="'+nro+'" readonly /></div>';
				$(html).appendTo("#disponible");
				redireccionar("ArticulosC.html\#ArticuloC");
			});
		}else if(localStorage.CArt=='a'){

			jQuery.get("http://corprocessu.com:8000/ConsultaAlmacen",function(resultado){
				miRes = jQuery.parseJSON(resultado);
				html='<div data-role="fieldcontain"> <label for="almacen">Almacen:</label> <input type="text" onChange="local1(\'ArticulosC.html\',\'a\')" name="almacen" id="almacen" value="'+localStorage.almacenid+'" list="listadata"><datalist id="listadata">'; 
				$.each(miRes,function(i,elemento){
					html+='<option title="'+elemento.sec+'" value="'+elemento.id+'">';
				});
				html+='</datalist></div>';
				$(html).appendTo("#ArtA");
				if(localStorage.CxA!=""){
				
					//
					jQuery.get("http://corprocessu.com:8000/ConsultaArtA/"+localStorage.matcat+"/"+localStorage.CxA,function(resultado){
						miRes = jQuery.parseJSON(resultado);	
						html= '<div data-role="content" id="Art" aling="center"><ul data-role="listview" id="Restan"><li data-role="list-divider" role="heading"><h3>Disponible</h3></li>';
						$.each(miRes,function(i,elemento){
							html+='<li>'+elemento.id+' : '+elemento.num+' </li><li data-role="list-divider" role="heading"></li></ul></div>';
						});														
						$(html).appendTo("#ConsultaArt");
						redireccionar("ArticulosC.html\#ArticuloC");
					});
				}else{redireccionar("ArticulosC.html\#ArticuloC");}
			});	
		}else{redireccionar("ArticulosC.html\#ArticuloC");}
	});
}

//Función que guarda los datos necesarios para consultar materiales o composiciones
function local1(arg,tipo){

	localStorage.almacenid=document.getElementById("almacen").value;
	dat=document.getElementById("listadata").options;
	$.each(dat,function(i,e){
		if(e.value==localStorage.almacenid){
			localStorage.CxA=e.title;
		}
	});

	//Composición 
	if(tipo=='c'){
		GuardarComp();
	}
	//Material
	else if(tipo=='a'){
		GuardarMatcat();
	}
	redireccionar(arg);
}

//REVISAR
function localA(arg,tipo){
			
	if(tipo=='a'){
		GuardarMatcat();
		if(localStorage.matcatid!=""){
			localStorage.CArt='a';
			localStorage.CxA="";
		}else{
			alert("Falta elegir el Material");
			return
		}
	}else{
		GuardarComp();
		if(localStorage.compid!=""){
			localStorage.CArt='a';
			localStorage.CxA="";
		}else{
			alert("Falta elegir la Composición");
			return
		}
	}
	redireccionar(arg);
}

//REVISAR
function localT(arg,tipo){
	
	if(tipo=='a'){
		GuardarMatcat();
		if(localStorage.matcatid!=""){
			localStorage.CArt='t';
			localStorage.CxA="";
		}else{
			alert("Falta elegir el Material");
			return
		}
	}else if(tipo=='c'){
		GuardarComp();
		if(localStorage.compid!=""){
			localStorage.CArt='t';
			localStorage.CxA="";
		}else{
			alert("Falta elegir la Composición");
			return
		}
	}	
	redireccionar(arg);
}

//Función que genera la pantalla de consultar composición
function ConsultarComp(){
	
	//Servicio que busca las composiciones
	jQuery.get("http://corprocessu.com:8000/ConsultaComposicion",function(resultado){
		miRes = jQuery.parseJSON(resultado);
		html='<div data-role="fieldcontain"> <label for="comp">Composicion:</label> <input type="text" name="comp" id="comp" value="'+localStorage.compid+'" list="listdata" onChange="" ><datalist id="listdata">';
		$.each(miRes, function(i, elemento){
			html+= '<option title="'+elemento.sec+'" value="'+elemento.id+'">';			
		});
		html+='</datalist></div>';
		$(html).appendTo("#ConsultaComp");
		var nro = 0;
		if(localStorage.CArt=='t'){
		
			//Servicio que busca los datos de todas las composiciones 
			jQuery.get("http://corprocessu.com:8000/ConsultaTodosComp/"+localStorage.comp,function(resultado){
				miRes = jQuery.parseJSON(resultado);
				html='<div data-role="content" id="Art" aling="center"><ul data-role="listview" id="Restan"><li data-role="list-divider" role="heading"><h3>Restan</h3></li>';
				$.each(miRes,function(i,elemento){
					if(i==0){
						nro=elemento.dis;
					}else{
						html+='<li>'+elemento.matcat_n1+' , '+ elemento.matcat_n2 +' , '+ elemento.matcat_n3 +' , '+ elemento.matcat +' : '+elemento.res+'</li><li data-role="list-divider" role="heading"></li>';
					}
				});
				html+='</ul></div>';
				$(html).appendTo("#ConsultaCompL");
				html ='<div data-role="fieldcontain"><label for="textinput">Disponible:</label><input type="text" name="textinput" id="textinput" value="'+nro+'" readonly /></div>';
				$(html).appendTo("#disponible");
				redireccionar("ComposicionesC.html\#consulta_comp");
				
			});
		}else if(localStorage.CArt=='a'){
	
			//Servicio que busca los almacenes
			jQuery.get("http://corprocessu.com:8000/ConsultaAlmacen",function(resultado){
				miRes = jQuery.parseJSON(resultado);
				html='<div data-role="fieldcontain"> <label for="almacen">Almacen:</label> <input type="text" onChange="local1(\'ComposicionesC.html\',\'c\')" name="almacen" id="almacen" value="'+localStorage.almacenid+'" list="listadata"><datalist id="listadata">'; 
				$.each(miRes,function(i,elemento){
					html+='<option title="'+elemento.sec+'" value="'+elemento.id+'">';
				});
				html+='</datalist></div>';
				$(html).appendTo("#ArtA");
				if(localStorage.CxA!=""){
				
					//Servicio que busca los datos de las composiciones filtradas por un almacen seleccionado
					jQuery.get("http://corprocessu.com:8000/ConsultaAlmacenComp/"+localStorage.comp+"/"+localStorage.CxA,function(resultado){
						miRes = jQuery.parseJSON(resultado);	
						html='<div data-role="content" id="Art" aling="center"><ul data-role="listview" id="Restan"><li data-role="list-divider" role="heading"><h3>Restan</h3></li>';
						$.each(miRes,function(i,elemento){
							if(i==0){
								nro=elemento.dis;
							}else{
								html+='<li>'+elemento.matcat_n1+' , '+ elemento.matcat_n2 +' , '+ elemento.matcat_n3 +' , '+ elemento.matcat +' : '+elemento.res+'</li><li data-role="list-divider" role="heading"></li>';
							}
						});
						html+='</ul></div>';
						$(html).appendTo("#ConsultaCompL");
						html ='<div data-role="fieldcontain"><label for="textinput">Disponible:</label><input type="text" name="textinput" id="textinput" value="'+nro+'" readonly /></div>';
						$(html).appendTo("#disponible");
						redireccionar("ComposicionesC.html\#consulta_comp");
					});
				}else{redireccionar("ComposicionesC.html\#consulta_comp");}
			});	
		}else{
			redireccionar("ComposicionesC.html\#consulta_comp");
		}
	});
}
	
//Función auxiliar que inicializa las variables necesarias para consultar una composición	
function PreConsultarComposicion(){
	localStorage.comp="";
	localStorage.compid="";
	localStorage.CArt="";
	localStorage.CxA="";
	localStorage.almacenid="";
	redireccionar("ComposicionesC.html");
}

//Función que almacena los valores de las fechas a utilizar en el flitro de la busqueda
function GuardarFecha(arg){
	
	localStorage.FI=document.getElementById('FI').value;
	localStorage.FF=document.getElementById('FF').value;
	if(localStorage.FI==""){
		alert("Faltan parametros");
	}else{
		redireccionar(arg);
	}
}

//Función auxiliar que inicializa las variables necesarias para realizar una consulta filtrada por un rango de fechas
function PreConsultaRecepcion(arg){
	
	localStorage.FI="";
	localStorage.FF="";
	redireccionar(arg);
}

//Función auxiliar que almacena los datos necesarios para consultar una recepción
function ConsultaR(sec){

	localStorage.Recep=sec;
	redireccionar("CRecepcionE.html");
}

//Función que genera la pantalla de consultar recepciones filtrada por un rango de fechas
function CRecepcion(){
	
	$('#FI').val(localStorage.FI);
	$('#FF').val(localStorage.FF);
	if(localStorage.FI != ""){
		if(localStorage.FF != ""){
			fin=localStorage.FF;
		}else{
			d = new Date();
			mes = d.getMonth()+1;
			fin = d.getFullYear()+"-"+mes+"-"+d.getDate();
		}
		
		//Servicio que busca los datos de las recepciones que cumplen el rango de fechas
		jQuery.get("http://corprocessu.com:8000/CRecepcion/"+localStorage.FI+"/"+fin+"/"+0,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			nro=0;
			html="";
			$.each(miRes, function(i, elemento){
				nro+=1;
				html+='<li><a onClick="ConsultaR('+elemento.sec+')"><h3>Recepcion Nro '+elemento.nro+'</h3><p>Responsable '+elemento.resp+'; Fecha: '+elemento.fecha+'</p><p> Nro Items: '+elemento.cant +'; Estatus: '+elemento.estatus+'</p></a></li><li data-role="list-divider" role="heading"></li>';
			});
			html='<ul data-role="listview" id="ConsultaRec"><li data-role="list-divider" role="heading"><h3>Recepciones: '+nro+'</h3></li>'+html+'</ul>';
			$(html).appendTo('#Recep');
			redireccionar("CRecepcion.html\#CRecepcion");
		});	
	}else{redireccionar("CRecepcion.html\#CRecepcion");}
}

//Función que genera la pantalla de consultar una recepción seleccionada
function ConsultaRecepcion(){

	//Servicio que busca los datos de la recepción seleccionada
	jQuery.get("http://corprocessu.com:8000/ConsultaRecep/"+localStorage.Recep,function(resultado){
		miRes = jQuery.parseJSON(resultado);	
		html = "";
		$.each(miRes, function(i, elemento){
			if(i==0){
				estatus=elemento.estatus;
				html+='<div data-role="fieldcontain"><label for="textinput2">Recepcion Nro:</label><input type="text" name="textinput2" id="textinput2" value="'+elemento.nro+'" readonly  /> </div>';
				html+='<div data-role="fieldcontain"><label for="textinput">Factura Nro:</label><input type="text" name="textinput" id="textinput" value="'+elemento.fac+'"  readonly/>  </div>';
				html+='<div data-role="fieldcontain"><label for="textinput7">Fecha:</label><input type="text" name="textinput7" id="textinput7" value="'+elemento.fecha+'" readonly /> </div>';
				html+='<div data-role="fieldcontain"><label for="textinput6">Estatus:</label><input type="text" name="textinput6" id="textinput6" value="'+elemento.estatus+'"  readonly/></div>';
				html+='<div data-role="fieldcontain"><label for="textinput5">Responsable:</label><input type="text" name="textinput5" id="textinput5" value="'+elemento.resp+'" readonly /></div>';
				html+='<div data-role="fieldcontain"><label for="textinput4">Nro de Items a Recibir:</label><input type="text" name="textinput4" id="textinput4" value="'+elemento.recibir+'" readonly /></div>';	
				html+='<div data-role="fieldcontain"><label for="textinput3">Nro de Items Recibidos:</label><input type="text" name="textinput3" id="textinput3" value="'+elemento.recibidos+'" readonly  /></div>';
				html+='<div data-role="content" id="lista" aling="center"><ul data-role="listview" id="Listaitems"><li data-role="list-divider" role="heading"></li>';
				localStorage.FTrans=elemento.facsec;
				localStorage.mov=localStorage.Recep;
			}else{
				html+='<li><h3>Grupo: '+elemento.grupo+' ;SubGrupo: '+elemento.subgrupo+' ;Clase: '+elemento.clase+' ;Material: '+elemento.material+' ; Unidades: '+elemento.unidades+'</h3><p>Almacen: '+elemento.almacen+'</p><p>Faltan '+elemento.faltan+' unidades</p></li><li data-role="list-divider" role="heading"></li>';	
			}
		});
		html+='</ul></div>';
		if(estatus[0]!='P'){
			
			html+='<button onClick="redireccionar(\'NewRecep.html\')">Continuar Recepcion</button>';
			
		}
		$(html).appendTo('#CRecep');
		redireccionar("CRecepcionE.html\#CRecepcionE");
	});

}

//Función auxiliar que guarda el valor del almacen seleccionado
function GuardarAlmacen(arg){
	var x=document.getElementById("almacen").selectedIndex;
	var y=document.getElementById("almacen").options;
	if(y[x].index!=0){
		localStorage.CxA=y[x].value;
		redireccionar(arg);
	}else{
		alert("Faltan parametros");
	}
}

//Función auxiliar que inicializa las variables necesarias para realizar las consultas de lotes por codificar
function PreConsultaLxC(){
	localStorage.CxA="";
	redireccionar('CLotesCod.html');
}

//Función que genera la pantalla de Consulta lotes por codificar
function ConsultaLxCod(){

	//Servicio que busca los datos de los almacenes
	jQuery.get("http://corprocessu.com:8000/ConsultaAlmacen",function(resultado){
		miRes = jQuery.parseJSON(resultado);
		html='<div data-role="fieldcontain"><label for="almacen">Almacen:</label> <select  name="almacen" id="almacen" ><option value="">Seleccione</option>'; 
		$.each(miRes,function(i,elemento){
			if(localStorage.CxA==elemento.sec){
				html+='<option value='+elemento.sec+' selected>'+elemento.id+'</option>';
			}else{
				html+='<option value='+elemento.sec+'>'+elemento.id+'</option>';
			}
		});

		html+='</select></div>';
		$(html).appendTo("#selA");
		if(localStorage.CxA!=""){
			
			//Servicio que busca los datos de todos los lotes por codificar que se encuentran en el almacen seleccionado
			jQuery.get("http://corprocessu.com:8000/ConsultaLxC/"+localStorage.CxA,function(resultado){
				miRes = jQuery.parseJSON(resultado);
				html="";
				nro=0;
				$.each(miRes,function(i,elemento){
					nro+=1;
					html+='<li><h3>Grupo:'+elemento.matcat_n1+'; SubGrupo:'+elemento.matcat_n2+'; Clase:'+elemento.matcat_n3+'; Material:'+elemento.matcat+'</h3><p> Recepcion: '+ elemento.recep+' ; Fecha: '+elemento.fecha+'</p><p>Nro Items '+elemento.nro+'</p></li><li data-role="list-divider" role="heading"></li>';
				});
				html='<div data-role="content" id="Lotes" aling="center"><ul data-role="listview" id="Listalotes"><li data-role="list-divider" role="heading"><h3>Lotes por Codificar: '+nro+'</h3></li>'+html+'</ul></div>';
				$(html).appendTo("#listalotes");
				redireccionar("CLotesCod.html\#CLotesCod");
			});
		}else{
			redireccionar("CLotesCod.html\#CLotesCod");
		}
	});
}

//Función que genera la patalla de consulta de todas las facturas en transito que se encuentran en un rango de fechas
function CFacTrans(){
	$('#FI').val(localStorage.FI);
	$('#FF').val(localStorage.FF);
	if(localStorage.FI != ""){
		if(localStorage.FF != ""){
			fin=localStorage.FF
		}else{
			d = new Date();
			mes = d.getMonth()+1;
			fin = d.getFullYear()+"-"+mes+"-"+d.getDate();
		}
		
		//Servicio que busca los datos de las facturas en transito que estan en el rango de fechas
		jQuery.get("http://corprocessu.com:8000/CFacTrans/"+localStorage.FI+"/"+fin,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			nro=0;
			html="";
			items=0;
			monto=0.0;
			$.each(miRes, function(i, elemento){
				nro+=1;
				items+=elemento.items;
				monto+=parseFloat(elemento.monto);
				html+='<li><a href="#" onClick="FTrans('+elemento.sec+')"><h3>Nro Factura '+elemento.nro+'</h3><p>Fecha: '+elemento.fecha+'</p><p> Estatus: '+elemento.estatus+'; Nro Items: '+elemento.items +'; Monto: '+elemento.monto+'</p></li><li data-role="list-divider" role="heading"></a></li>';
			});
			html='<ul data-role="listview" id="ConsultaRec"><li data-role="list-divider" role="heading"><h3>Facturas en Transito: '+nro+'; Items: '+ items+'; Monto: '+monto+'</h3></li>'+html+'</ul>';
			$(html).appendTo('#FacT');
			redireccionar("CFacTrans.html\#CFacTrans");
		});
		
	}else{redireccionar("CFacTrans.html\#CFacTrans");}

}

//
function FTrans(sec){
	localStorage.FTrans=sec;
	redireccionar("FacTrans.html");
}

//Función que genera la pantalla de consulta de una factura en transito seleccionada
function ConsultaFTrans(){

	//Servicio que busca los datos de la factura a consultar
	jQuery.get("http://corprocessu.com:8000/ConsultaFTrans/"+localStorage.FTrans,function(resultado){
		miRes = jQuery.parseJSON(resultado);
		html='';
		pend=0;
		recibidos=0;
		$.each(miRes, function(i, elemento){
			if(i==0){
			
				html='<div data-role="fieldcontain"><label for="textinput2">Factura Nro:</label><input type="text" name="textinput2" id="textinput2" value="'+elemento.nro+'" readonly  /></div>';
				html+='<div data-role="fieldcontain"><label for="textinput">Proveedor:</label><input type="text" name="textinput" id="textinput" value="'+elemento.empinst+'"  readonly/> </div>';
				html+='<div data-role="fieldcontain"><label for="textinput8">Almacen:</label><input type="text" name="textinput8" id="textinput8" value="'+elemento.almacen+'" readonly/> </div>';
				html+='<div data-role="fieldcontain"><label for="textinput7">Fecha Emision:</label><input type="text" name="textinput7" id="textinput7" value="'+elemento.emision+'" readonly /></div>';
				html+='<div data-role="fieldcontain"><label for="textinput6">Fecha Recepcion:</label><input type="text" name="textinput6" id="textinput6" value="'+elemento.recepcion+'"  readonly/></div>';
				html+='<div data-role="fieldcontain"><label for="textinput5">Estatus:</label><input type="text" name="textinput5" id="textinput5" value="'+elemento.estatus+'" readonly /></div>';
				html+='<div data-role="fieldcontain"><label for="textinput4">Nro de Items:</label><input type="text" name="textinput4" id="textinput4" value="'+elemento.items+'" readonly /></div>';
			
			}
			pend+=elemento.cantp;
			recibidos+=elemento.cant;
			
		});
		recibidos-=pend;
		html+='<div data-role="fieldcontain"><label for="textinput3">Nro de Items Recibidos:</label><input type="text" name="textinput3" id="textinput3" value="'+recibidos+'" readonly  /></div>';
		html+='<div data-role="fieldcontain"><label for="textinpu">Nro de Items Pendientes:</label><input type="text" name="textinpu" id="textinpu" value="'+pend+'" readonly  /></div>';
      	$(html).appendTo('#ConTrans');
		redireccionar("FacTrans.html\#CTrans");
	});
}

//Función que genera la pantalla de consulta de recepciones filtradas por la factura
function CRecepByFac(){
	$('#FI').val(localStorage.FI);
	$('#FF').val(localStorage.FF);
	if(localStorage.FI != ""){
		if(localStorage.FF != ""){
			fin=localStorage.FF;
		}else{
			d = new Date();
			mes = d.getMonth()+1;
			fin = d.getFullYear()+"-"+mes+"-"+d.getDate();
		}
		//Servicio que busca los datos de las recepciones asociadas a una factura y que se encuentre en el rango de las fechas
		jQuery.get("http://corprocessu.com:8000/CRecepcion/"+localStorage.FI+"/"+fin+"/"+localStorage.FTrans,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			nro=0;
			html="";
			$.each(miRes, function(i, elemento){
				nro+=1;
				html+='<li><a onClick="ConsultaR('+elemento.sec+')"><h3>Recepcion Nro '+elemento.nro+'</h3><p>Responsable '+elemento.resp+'; Fecha: '+elemento.fecha+'</p><p> Nro Items: '+elemento.cant +'; Estatus: '+elemento.estatus+'</p></a></li><li data-role="list-divider" role="heading"></li>';
			});
			html='<ul data-role="listview" id="ConsultaRec"><li data-role="list-divider" role="heading"><h3>Recepciones: '+nro+'</h3></li>'+html+'</ul>';
			$(html).appendTo('#Recep');
			redireccionar("CRecepByFac.html\#CRecepByFac");
		});
	}else{
	
		//Servicio que busca los datos de las recepciones asociadas a una factura
		jQuery.get("http://corprocessu.com:8000/CAllRecepByFac/"+localStorage.FTrans,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			nro=0;
			html="";
			$.each(miRes, function(i, elemento){
				nro+=1;
				html+='<li><a onClick="ConsultaR('+elemento.sec+')"><h3>Recepcion Nro '+elemento.nro+'</h3><p>Responsable '+elemento.resp+'; Fecha: '+elemento.fecha+'</p><p> Nro Items: '+elemento.cant +'; Estatus: '+elemento.estatus+'</p></a></li><li data-role="list-divider" role="heading"></li>';
			});
			html='<ul data-role="listview" id="ConsultaRec"><li data-role="list-divider" role="heading"><h3>Recepciones: '+nro+'</h3></li>'+html+'</ul>';
			$(html).appendTo('#Recep');
			redireccionar("CRecepByFac.html\#CRecepByFac");
		});
	}
}

//Función que inicializa las variables necesarias para ingresar una nueva recepción
function PreIngresarRecep(){
	
	localStorage.mov="";
	redireccionar('NewRecep.html');
	
}

//Función que genera la pantalla para generar los detalles de una recepción 
function PreIngresarRecepaux(){
	
	if(localStorage.mov==""){
	
		//Servicio que busca los datos necesarios para crear la cabecera de una recepción
		jQuery.get("http://corprocessu.com:8000/PreIngresarRecep/"+localStorage.FTrans+"/0",function(resultado){
			miRes = jQuery.parseJSON(resultado);
			html='<div data-role="fieldcontain"><label for="textinput2">Identificador:</label><input type="text" name="textinput2" id="textinput2" value="" /> </div>';
			html+='<div data-role="fieldcontain"><label for="textarea">Descripcion:</label><textarea cols="40" rows="8" name="textarea" id="textarea"></textarea></div>';
			html+='<div data-role="fieldcontain"><label for="FI">Fecha:</label><input type="date" name="FI" id="FI" /></div>';
			
			$.each(miRes, function(i, elemento){
				if(i==0){
				
					html+='<div data-role="fieldcontain"><label for="textinput">Factura:</label><input type="text" name="textinput" id="textinput" value="'+elemento.nro+'" readonly /> </div>';
					html+='<div data-role="fieldcontain"><label for="textinput4">Proveedor:</label><input type="text" name="textinput4" id="textinput4" value="'+elemento.empinst+'" readonly/> </div>';
					html+='<div data-role="fieldcontain"><label for="textinput7">Almacen:</label><input type="text" name="textinput7" id="textinput7" value="'+elemento.almacen+'" readonly/> </div>';
					html+='<div data-role="fieldcontain"><label for="textinput5">Nro de Items a recibir:</label><input type="text" name="textinput5" id="textinput5" value="'+elemento.items+'" readonly/> </div>';
					html+='<div data-role="fieldcontain"><label for="resp">Responsable:</label><input type="text" name="resp" id="resp" value="" list="listdatar"/> <datalist id="listdatar">';
					
				}else{
					html+='<option title="'+elemento.sec+'" value="'+elemento.nombre+'">';
				}
			});
			
			html+='</datalist></div><div data-role="fieldcontain"><label for="textinput3">Nro Recepcion:</label><input type="text" name="textinput3" id="textinput3" value="" /> </div>';
			html+='<button onClick="IngresarRecep()">Crear Recepcion</button>';
			$(html).appendTo('#DRecep');

			
			redireccionar("NewRecep.html\#NewRecep");
		});
	}else{
	
		//Servicio que busca los datos necesarios para crear un detalle de la recepción
		jQuery.get("http://corprocessu.com:8000/PreIngresarRecep/"+localStorage.FTrans+"/"+localStorage.mov,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			$.each(miRes, function(i, elemento){
				if(i==0){	
					localStorage.almacen=elemento.almacen;
					html1='<div data-role="fieldcontain"><label for="textinput">Factura:</label><input type="text" name="textinput" id="textinput" value="'+elemento.nro+'" readonly /> </div>';
					html1+='<div data-role="fieldcontain"><label for="textinput4">Proveedor:</label><input type="text" name="textinput4" id="textinput4" value="'+elemento.empinst+'" readonly/> </div>';
					html1+='<div data-role="fieldcontain"><label for="textinput7">Almacen:</label><input type="text" name="textinput7" id="textinput7" value="'+elemento.almacen+'" readonly/> </div>';
					html1+='<div data-role="fieldcontain"><label for="textinput5">Nro de Items a recibir:</label><input type="text" name="textinput5" id="textinput5" value="'+elemento.items+'" readonly/> </div>';
				}else{
					html='<div data-role="fieldcontain"><label for="textinput2">Identificador:</label><input type="text" name="textinput2" id="textinput2" value="'+elemento.id+'" readonly /> </div>';
					html+='<div data-role="fieldcontain"><label for="textarea">Descripcion:</label><textarea cols="40" rows="8" name="textarea" id="textarea" readonly>'+elemento.desc+'</textarea></div>';
					html+='<div data-role="fieldcontain"><label for="FI">Fecha:</label><input type="text" name="FI" id="FI" value="'+elemento.fecha+'"/></div>';
					html2='<div data-role="fieldcontain"><label for="textinput1">Responsable:</label><input type="text" name="textinput1" id="textinput1" value="'+elemento.resp+'" readonly/> </div>';
					html2+='<div data-role="fieldcontain"><label for="textinput6">Recepcion Nro:</label><input type="text" name="textinput6" id="textinput6" value="'+elemento.nro+'" readonly/> </div><hr />';
				}
			});
			html+=html1+""+html2;

			//Servicio que busca los datos necesarios del material que se va recibir 
			jQuery.get("http://corprocessu.com:8000/ConsultaMatcatNew/"+localStorage.FTrans,function(resultado){
				miRes = jQuery.parseJSON(resultado);
				pend = [];
				html+='<div data-role="fieldcontain"><label for="matcat">Material:</label><input type="text" name="matcat" id="matcat" value="" list="listdata"/> <datalist id="listdata">';
				$.each(miRes, function(i, elemento){
					pend[elemento.sec]=elemento.pend;
					html+= '<option title="'+elemento.sec+'" value="'+elemento.id+'" label="'+elemento.monto+'">';			
				});
				localStorage.cant=0;
				html+= '</datalist></div><div data-role="fieldcontain"><label for="cant">Cantidad:</label><input type="number" name="cant" id="cant" value="0" onChange="valida(pend)"/></div>';
				
				//Servicio que busca los datos de los almacenes
				jQuery.get("http://corprocessu.com:8000/ConsultaAlmacen",function(resultado1){
					miRes = jQuery.parseJSON(resultado1);
					html+='<div data-role="fieldcontain"><label for="almacen">Almacen:</label><input type="text" name="almacen" id="almacen" value="'+localStorage.almacen+'" list="listadata"/> <datalist id="listadata">';
					$.each(miRes, function(i, elemento){
						html+='<option title="'+elemento.sec+'" value="'+elemento.id+'" >';								
					});
					html+='</datalist></div>';
					html+='<div  align="center" data-inline="true"><button data-inline="true" onClick="ProcesarItem()">Procesar Item</button><button data-inline="true" onClick="CerrarRecep()">Cerrar Recepcion</button></div>';
					
					$(html).appendTo('#DRecep');
					redireccionar("NewRecep.html\#NewRecep");
				});
			});
		});
	}
}

//Función que actualiza el estatus de una recepción a Procesada 
function CerrarRecep(){
	jQuery.get("http://corprocessu.com:8000/CerrarRecep/"+localStorage.mov+"/"+localStorage.nombre,function(resultado1){
		redireccionar("Consultas.html");
	});
}

//Función que genera el detalle de una recepción
function ProcesarItem(){

	item=document.getElementById("matcat").value;
	cant=document.getElementById("cant").value;
	almacen=document.getElementById("almacen").value;
	if(item!="" && cant>0 && almacen!=""){
		dat=document.getElementById("listdata").options;
		data=document.getElementById("listadata").options;
		
		$.each(dat,function(i,e){
			if(e.value==item){
				sec=e.title;
				monto=e.label;
			}
		});$.each(data,function(i,e){
			if(e.value==almacen){
				almacensec=e.title;
			}
		});
		
		//Servicio que genera el detalle de una recepción
		jQuery.get("http://corprocessu.com:8000/IngresarRecepcionDet/"+sec+"/"+localStorage.mov+"/"+almacensec+"/"+cant+"/"+localStorage.nombre+"/"+monto,function(resultado1){
			redireccionar("NewRecep.html");
		});
	}
}

//Función auxiliar que verifica que la cantidad elegida sea factible
function valida(pend){

	item=document.getElementById("matcat").value;
	cant=document.getElementById("cant").value;
	dat=document.getElementById("listdata").options;
	if(item==""){
		alert("Elija el Material primero");
		$('#cant').val(localStorage.cant);
	}else{
		$.each(dat,function(i,e){
			if(e.value==item){
				items=e.title;
			}
		});
		if(cant>pend[items]){
			alert("Cantidad muy grande");
			$('#cant').val(localStorage.cant);
		}else {
			localStorage.cant=cant;
		}	
	}
}

//Función que crea el encabezado de una recepción
function IngresarRecep(){

	id=document.getElementById("textinput2").value;
	desc=document.getElementById("textarea").value;
	fecha=document.getElementById("FI").value;
	nro=document.getElementById("textinput3").value;
	resp1=document.getElementById("resp").value;
	dat=document.getElementById("listdatar").options;
	$.each(dat,function(i,e){
		if(e.value==resp1){
			resp=e.title;
		}
	});
	//localStorage.user
	//Servicio que crea el encabezado de una recepción
	jQuery.get("http://corprocessu.com:8000/IngresarRecep/"+id+"/"+desc+"/"+fecha+"/"+localStorage.FTrans+"/"+resp+"/"+nro+"/"+localStorage.nombre,function(resultado){
		miRes = jQuery.parseJSON(resultado);
		$.each(miRes, function(i, elemento){
			localStorage.mov=elemento.sec;
		});
		redireccionar("NewRecep.html");
	});	
}

//Función que inicializa todos los datos necesarios y crea el encabezado de una codificación
function MenuCodif(){
	localStorage.matcatid="";
	localStorage.matcat="";
	localStorage.almacen="";
	localStorage.mov="";
	id=document.getElementById("id").value;
	desc=document.getElementById("desc").value;
	fecha=document.getElementById("fecha").value;
	resp=document.getElementById("textinput5").value;
	dat=document.getElementById("listdata").options;
	$.each(dat,function(i,e){
		if(e.value==resp){
			respsec=e.title;
		}
	});
	
	//Servicio que genera el encabezado de una codificación
	jQuery.get("http://corprocessu.com:8000/IngresarCod/"+id+"/"+desc+"/"+fecha+"/"+respsec+"/"+localStorage.nombre,function(resultado){
		miRes = jQuery.parseJSON(resultado);
		$.each(miRes, function(i, elemento){
			localStorage.mov=elemento.sec;
		});
		redireccionar('Codificacion.html');
	});
}

//Función que genera la pantalla que realiza las codificaciones
function PreCodificacion(){
	
	//Servicio que busca los posibles materiales a codificar y los almacenes
	jQuery.get("http://corprocessu.com:8000/PreCodif",function(resultado){
		miRes = jQuery.parseJSON(resultado);
		almacen='<div data-role="fieldcontain"><label for="almacen">Almacen:</label><input type="text" name="almacen" id="almacen" value="'+localStorage.almacen+'" onChange="ActAlm()" list="listadata"/> <datalist id="listadata">';
		matcat='<div data-role="fieldcontain"><label for="matcat">Material:</label><input type="text" name="matcat" id="matcat" value="'+localStorage.matcatid+'" onChange="ActDatos()" list="listdata"/> <datalist id="listdata">';
		$.each(miRes, function(i, elemento){
			if(i==0){
				$.each(elemento, function(i, elemento1){
					matcat+='<option title="'+elemento1.sec+'" value="'+elemento1.id+'">';								
				});
				matcat+='</datalist></div>';
			}else{
				$.each(elemento, function(i, elemento1){
					almacen+='<option title="'+elemento1.sec+'" value="'+elemento1.id+'">';								
				});
				almacen+='</datalist></div>';
			}
		});
		html=matcat+""+almacen;
		
		//Servicio que genera una lista con los detalles de las anteriores codificaciones
		jQuery.get("http://corprocessu.com:8000/ListDetCod/"+localStorage.mov,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			html0='<div data-role="content" id="lista" aling="center"><ul data-role="listview" id="Listaitems"><li data-role="list-divider" role="heading"></li>';
			$.each(miRes, function(i, elemento){
				html0+='<li><h3>Material: '+elemento.material+'</h3><p> Nro de Articulos Codificados: '+elemento.cod+'</p><p>Nro de Articulos por Codificar: '+elemento.por+'</p></li><li data-role="list-divider" role="heading"></li>';	
			});
			html0+='</ul></div>';
			
			if(localStorage.matcatid==""){		
				html+=html0;
				$(html).appendTo('#cod');
				redireccionar("Codificacion.html\#Cod");				
			}else{
				
				//Servicio que carga la cantidad de articulos por codificar en base al material selccionado
				jQuery.get("http://corprocessu.com:8000/PreCodifMatcat/"+localStorage.matcat,function(resultado){
					miRes = jQuery.parseJSON(resultado);
					$.each(miRes, function(i, elemento){
						html+='<div data-role="fieldcontain"><label for="textinput5">Por Codificar:</label><input type="text" name="textinput5" id="textinput5" value="'+elemento.pend+'" readonly /></div>';
						html+='<div data-role="fieldcontain"><label for="textinput4">Nro Del Primer Codigo Colocado:</label><input type="number" name="textinput4" id="textinput4" value="" /></div>';
						html+='<div data-role="fieldcontain"><label for="textinput3">Nro Del Ultimo Codigo Colocado:</label><input type="number" name="textinput3" id="textinput3" value="" /></div>';
					});
					html+='<button onClick="GenerarCod()">Generar Codificacion</button>'+html0;
					$(html).appendTo('#cod');
					redireccionar("Codificacion.html\#Cod");
				});
			}
		});
	});	
}

//Función auxiliar que guarda el valor del almacen seleccionado 
function ActAlm(){
	localStorage.almacen=document.getElementById("almacen").value;
}

//Función auxiliar que almacena el valor del material seleccionado y recarga la pantalla
function ActDatos(){
	localStorage.matcatid=document.getElementById("matcat").value;
	dat=document.getElementById("listdata").options;
	$.each(dat,function(i,e){
		if(e.value==localStorage.matcatid){
			localStorage.matcat=e.title;
		}
	});
	redireccionar("Codificacion.html");
}

//Función que genera la pantalla para ingresar una nueva codificación
function PreCod(){
	
	jQuery.get("http://corprocessu.com:8000/ConsultaResp",function(resultado){
		miRes = jQuery.parseJSON(resultado);
		html='<div data-role="fieldcontain"><label for="id">Identificador:</label><input type="text" name="id" id="id" value="" /></div>';
		html+='<div data-role="fieldcontain"><label for="desc">Descripcion:</label><textarea cols="40" rows="8" name="desc" id="desc"></textarea></div>';
		html+='<div data-role="fieldcontain"><label for="fecha">Fecha:</label><input type="date" name="fecha" id="fecha" value="" /></div>';
		html+='<div data-role="fieldcontain"><label for="textinput5">Responsable:</label><input type="text" name="textinput5" id="textinput5" value="" list="listdata"/> <datalist id="listdata">';

		$.each(miRes, function(i, elemento){
			html+='<option title="'+elemento.sec+'" value="'+elemento.id+'">';
		});
		html+='</datalist></div>';
		$(html).appendTo('#Cod');
		redireccionar("PreCod.html\#PreCod");
	});
	
}

//Función que Genera los articulos de una codificación 
function GenerarCod(){
	CI=document.getElementById("textinput4").value;
	CF=document.getElementById("textinput3").value;
	pend=document.getElementById("textinput5").value;
	dat=document.getElementById("listadata").options;

	if(CI!="" && localStorage.almacen!=""){	
		if(CF!=""){
			if(pend<(abs(CF-CI)+1)){
				alert("Rango muy grande");
				return
			}
		}else{
			CF=0;
		}
		$.each(dat,function(i,e){
			if(e.value==localStorage.almacen){
				almacensec=e.title;
			}
		});
		error=false;
		listaerror="Los siguientes codigos ya estan registrados: ";
		
		//Servicio que verifica que ningun numero utilizado en el rango ya este utilizado
		
		jQuery.get("http://corprocessu.com:8000/ValidarCod/"+CI+"/"+CF,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			$.each(miRes, function(i, elemento){
				error=true;
				listaerror+=elemento.sec+",";					
			});
			if(error){
				alert(listaerror);
				redireccionar('Codificacion.html');
			}else{
			
				//Servicio que genera los articulos, crea el detalle de la codificación y actualiza las recepciones
				
				jQuery.get("http://corprocessu.com:8000/GenerarCod/"+localStorage.matcat+"/"+CI+"/"+CF+"/"+almacensec+"/"+localStorage.nombre+"/"+localStorage.mov,function(resultado){
					 redireccionar('Codificacion.html');
				});
			}	
		});
	}else{
		alert("Faltan parametros por seleccionar");
	}
}

function ConsultaC(sec){

	localStorage.Codif=sec;
	redireccionar("CCodificacionE.html");
}

//Función que genera la pantalla de consultar una recepción seleccionada
function ConsultaCodificacion(){

	//Servicio que busca los datos de la codificación seleccionada
	jQuery.get("http://corprocessu.com:8000/ConsultaCodif/"+localStorage.Codif,function(resultado){
		miRes = jQuery.parseJSON(resultado);	
		html = "";
		$.each(miRes, function(i, elemento){
		
			html+='<div data-role="fieldcontain"><label for="textinput2">Identificador:</label><input type="text" name="textinput2" id="textinput2" value="'+elemento.id+'" readonly  /> </div>';
			html+='<div data-role="fieldcontain"><label for="textarea">Descripcion:</label><textarea cols="40" rows="8" name="textarea" id="textarea" readonly>'+elemento.desc+'</textarea></div>';
			html+='<div data-role="fieldcontain"><label for="textinput7">Fecha:</label><input type="text" name="textinput7" id="textinput7" value="'+elemento.fecha+'" readonly /> </div>';
			html+='<div data-role="fieldcontain"><label for="textinput5">Responsable:</label><input type="text" name="textinput5" id="textinput5" value="'+elemento.resp+'" readonly /></div>';
			html+='<div data-role="fieldcontain"><label for="textinput">Nro de items:</label><input type="text" name="textinput" id="textinput" value="'+elemento.cant+'" readonly /></div>';
			localStorage.mov=localStorage.Codif;
			
		});
		html+='</ul></div>';

		html+='<button onClick="redireccionar(\'Codificacion.html\')">Continuar Codificacion</button>';

		$(html).appendTo('#CCodif');
		redireccionar("CCodificacionE.html\#CCodificacionE");
	});

}

function CCodificacion(){

	$('#FI').val(localStorage.FI);
	$('#FF').val(localStorage.FF);
	if(localStorage.FI != ""){
		if(localStorage.FF != ""){
			fin=localStorage.FF;
		}else{
			d = new Date();
			mes = d.getMonth()+1;
			fin = d.getFullYear()+"-"+mes+"-"+d.getDate();
		}
		
		//Servicio que busca los datos de las recepciones que cumplen el rango de fechas
		jQuery.get("http://corprocessu.com:8000/CCodificacion/"+localStorage.FI+"/"+fin,function(resultado){
			miRes = jQuery.parseJSON(resultado);
			nro=0;
			html="";
			$.each(miRes, function(i, elemento){
				nro+=1;
				html+='<li><a onClick="ConsultaC('+elemento.sec+')"><h3>'+elemento.id+'</h3><p>Responsable: '+elemento.resp+'; Fecha: '+elemento.fecha+'</p></a></li><li data-role="list-divider" role="heading"></li>';
			});
			html='<ul data-role="listview" id="ConsultaCod"><li data-role="list-divider" role="heading"><h3>Codificaciones: '+nro+'</h3></li>'+html+'</ul>';
			$(html).appendTo('#Codif');
			redireccionar("CCodificacion.html\#CCodificacion");
		});	
	}else{redireccionar("CCodificacion.html\#CCodificacion");}
	

}