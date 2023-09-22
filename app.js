const { createBot, createProvider, createFlow, addKeyword, EVENTS, addAnswer } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const { readFileSync } = require("fs");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const fs = require("fs")
const axios = require("axios");



let motivo;  


////////////////////////////////////////////////////////////////////////////////////////////
////     FUNCIONES
/////////////////////////////////////////////////////////////////////////////////////////

/* 
function numero(nnum){
let nuevoContenido = `\n${nnum}`;
  fs.appendFile('numeros.txt', nuevoContenido, function(error){
      if(error){
          console.log(`Error: ${error}`);
      } else {
          console.log('Numero Agendado de Venta');
      }
  })}


  function numero2(nnum){
    let nuevoContenido = `\n${nnum}`;
    
      fs.appendFile('numerosalquiler.txt', nuevoContenido, function(error){
          if(error){
              console.log(`Error: ${error}`);
          } else {
              console.log('Numero Agendado de Alquiler');
          }
      })}

 */
////////////////////////////////////////////////////////////////////////////////////////
//////////// FLUJO SPAM //////////
////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// FLUJO CLIENTE
/////////////////////////////////////////////////////////////////////////////////////////////////////////
      

const Cliente = addKeyword(["AGEN-TE"],{sensitive:true})
        .addAnswer("Tiene alguna consulta? En que horario podria llamarlo?", {capture:true, delay:5000}, async (ctx ,{endFlow,provider}) => {
                  if(ctx.body == "SM" || ctx.body == "Sm" || ctx.body == "sm"){
                    return endFlow(flowPrincipal)} 

        const refProvider = await provider.getInstance();
             const mywhatsa = "5491140054474@s.whatsapp.net";
                refProvider.sendMessage(mywhatsa, {text: `*${motivo}* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*` })})
         
    .addAnswer("Buenisimo, A la brevedad me estare comunicando con usted. Tambien puede enviarme a mi numero personal 11-4005-4474. Muchisimas Gracias. Quedo a sus ordenes", {capture:true, delay:5000}, async (ctx ,{gotoFlow,fallBack,provider}) => {
        const refProvider = await provider.getInstance();
          if(ctx.body == "SM" ||ctx.body == "Sm" || ctx.body == "sm"){
               return gotoFlow(Menuflow)}
    delay(1000)
        const mywhatsa = "5491140054474@s.whatsapp.net";
        
          refProvider.sendMessage(mywhatsa, {text:`SIG MSJ\nNumero: +${ctx.from}\nINFO: *${ctx.body}*`}) 
     return fallBack("Gracias por comunicarse con nosotros. Escriba *SM* para volver al menu inicial")
  }) 


///////////////////////////////////////////////////////////////// EVENTO VOICE

const audiono = addKeyword(EVENTS.VOICE_NOTE)
  .addAnswer('Disculpe, no puedo escuchar audios. Por favor utilice solo texto.')


///////////////////////////////////////////////////////////////// FLUJO ALQUILER


const flowsAlquiler = addKeyword(['//alqu-iler//'], {sensitive: true})
          .addAnswer('👌Te envio la info de alquiler.',{delay:3000})
          
          .addAnswer('Selfie Mirror',{
               media: 'banner22.jpg', delay: 3000} )
          
         .addAnswer(['*Espejo Mágico Selfie Mirror*',
                     '\nDiseño elegante: Nuestro espejo mágico tiene un diseño moderno y elegante que se adapta a cualquier tipo de evento.',
                    'Su apariencia sofisticada agrega un toque especial al ambiente.',
                    '\nAccesorios y decoración: Contamos con una variedad de accesorios y elementos decorativos para personalizar aún ',
                     'más la experiencia. Puedes elegir entre diferentes marcos, sombreros, anteojos, pizarras con mensajes divertidos' ,
                      'y más. Estos elementos permiten que los invitados se diviertan y creen fotos únicas.',
                    '\nTamaño y portabilidad: El espejo mágico tiene dimensiones compactas que facilitan su transporte e instalación en ',
                    'diferentes espacios. Es lo suficientemente versátil como para adaptarse a salones de eventos, fiestas en exteriores ',
                   'y otros lugares.',
                   '\nOpciones de software: Nuestro espejo mágico viene con un software propio que ofrece una amplia gama de funciones ',
                   'y personalización. Puedes elegir entre diferentes plantillas de diseño, agregar efectos especiales a las fotos y configurar ',
                   'opciones de impresión según tus preferencias.',
                   '\nTiempo de alquiler: El tiempo de alquiler del espejo mágico es flexible y se adapta a las necesidades de tu evento.',
                   ' Puedes contratarlo por horas o por el tiempo que consideres necesario para brindar una experiencia completa a tus invitados.',
                   '\nRecuerda que nuestros servicios incluyen el montaje, desmontaje y la asistencia de personal capacitado durante todo' ,
                   'el evento. Estamos comprometidos en asegurar que tus invitados disfruten al máximo de la experiencia con el espejo mágico.',
                   'Valor Servicio por 2 Horas $ 75.000 (base)',
                   'El valor de la Hora adicional es de $ 35.000'], { delay: 3000 })
        
        .addAnswer('Espejo Mágico Selfie Mirror', {
            media: 'banner3.jpg', delay: 3000})
        
        .addAnswer(['*360 Super Slow.*',
                 '\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.',
                'Los videos son filmados y compartidos en el momento ya editados automáticamente',
                'Incluye accesorios (pelucas, pistola lanza burbujas, cotillón)',
               'El valor del servicio de 2 horas es de $ 75.000',
               'El valor de la Hora adicional es de $ 35.000 '], { delay: 3000 })
       
       .addAnswer('Plataforma 360 Super Slow',{
           media: 'banner.jpg' })

      .addAnswer(['🔒Los valores se congelan y la fecha se reserva solo al señar el servicio (2023)', 
             '🚚El valor no incluye traslados',
             '🚩*Servicio disponible para todo el país.* Contamos con representantes en todas las provincias'])

   .addAction(async (ctx, { provider, gotoFlow}) => {
          //  numero2(ctx.from)
           motivo= "Alquiler"
    const jid = ctx.key.remoteJid
    await provider.getInstance().sendMessage(jid, { video: readFileSync("video.mp4"), caption: "Showroom", gifPlayback: true })
    await provider.getInstance().sendMessage(jid, { video: readFileSync("video2.mp4"), caption: "Selfie Mirror", gifPlayback: true })
    await gotoFlow(Cliente)})

/////////////////////////////////////////////////////////////////////////////////////////// FLUJO VENTA


  const flowVenta = addKeyword(['VE-NTA'], { sensitive: true })
          .addAnswer('👌 Te envío la info de Venta.')

          .addAnswer(['*Espejo Mágico Selfie Mirror*',
                    '\nEl Espejo Mágico de Selfie Mirror cuenta con una cámara web de alta calidad, vidrio templado resistente, una Mini PC y un',
                    'televisor LED de 32 pulgadas. Estas características garantizan una experiencia de alta definición para capturar momentos',
                    'especiales.',
                   '\nSu diseño compacto y portátil, con dimensiones de 126 cm de alto x 70 cm de ancho y 20 cm de profundidad en el modelo',
                   'Slim, permite transportarlo fácilmente en cualquier vehículo. Esto brinda una gran versatilidad y conveniencia para eventos ',
                    'y fiestas.'  ])

        .addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg', delay: 5000 })

        .addAnswer(['La facilidad de uso es una de las ventajas clave del Espejo Mágico. Simplemente tienes que enchufarlo y presionar el ',
                      'botón de encendido para que empiece a funcionar. Esto agiliza la instalación y permite que los eventos comiencen rápidamente.',
                    '\nEs importante mencionar que el Selfie Mirror no incluye una impresora, pero está preparado para funcionar con cualquier ',
                    'impresora que se adapte a las necesidades del cliente. Esto brinda flexibilidad para elegir la impresora que mejor se ajuste a',
                    'los requerimientos de impresión.',
                   '\nEn cuanto al precio, el valor del equipo es de 1500 dólares o pesos al valor del dólar blue del día.'],{ capture: false }, async (ctx, { flowDynamic }) => {
                    const response = await axios.get('https://api.bluelytics.com.ar/v2/latest')  
                    const resultb = response.data.blue.value_sell;
                   
                     let valores1=resultb*1500 
                     let valores = new Intl.NumberFormat('es-MX').format( valores1 );
                            flowDynamic(
`*PRECIOS*
💵 *U$D 1,500 .-* 🔒
         ó
📈 AR$ ${valores} .- 🔓                                          
    
💱(~cotizacion = $ ${resultb}~)💱`)                              
                           
                    } )
        .addAnswer('Equipo Slim Selfie Mirror', {media: 'banner4.jpg',delay: 5000})

        .addAnswer(['*Plataforma 360 Super Slow*',
                  '\nLa plataforma incluye motor, control remoto, variador de velocidad, soporte para celular o Gopro y Aro de Led',
                 'El Valor en 70 o 90 cm es de $250.000',
                'El valor en 110 cm es de $280.000'])

        .addAnswer('Formas de pago: efectivo, transferencia/depósito')

        .addAnswer('Selfie Mirror', {media: 'banner22.jpg',delay: 3000})

        .addAnswer('✈️*Enviamos a todo el País.*')

    .addAction(async (ctx, { provider, gotoFlow,flowDynamic }) => {
                motivo = "VENTA"         
                // numero(ctx.from)
     const jid = ctx.key.remoteJid


    await provider.getInstance().sendMessage(jid, { video: readFileSync("video2.mp4"), caption: "Selfie Mirror", gifPlayback: true })
    await provider.getInstance().sendMessage(jid, { video: readFileSync("video.mp4"), caption: "Showroom", gifPlayback: true })
    await provider.getInstance().sendMessage(jid, { video: readFileSync("video3.mp4"), caption: "Slim", gifPlayback: true })
    await delay(3000)                 
       gotoFlow(Cliente) })
  

//////////////////////////////////////////////////////////////// EVENTO WELCOME


  const flowPrincipal = addKeyword(EVENTS.WELCOME)
                  .addAnswer("Hola, gracias por comunicarte con Selfie Mirror. Esta es una línea de respuestas automáticas. Responde con el número índice para continuar o continua al\n +5491140054474 - Nicolás", { capture: false }, async (ctx, { provider, gotoFlow }) => {
                    const msgPoll = {sticker: {url: "sticker.webp" } }
                       await gotoFlow(Menuflow)})


  /////////////////////////////////////////////////////////////////////////  FLUJO MENU
  
  const Menuflow = addKeyword(["me-nu"], { sensitive: true })
  .addAnswer("*MENU*\n*1* - Info de Alquiler \n*2* - Info de Venta \n*3* - Hablar con un asesor \n*4* - Showroom \n*5* - Horarios \n*6* - Página Web\n\n*0* - MODALIDAD SOCIOS", { capture: true, delay: 2000 }, async (ctx, { fallBack, gotoFlow, provider }) => {
     if (ctx.body == '1') {
          gotoFlow(flowsAlquiler)
      } else if (ctx.body == '2') {
         gotoFlow(flowVenta)
      } else if (ctx.body == '3') {
         nombre = "Cliente"
         gotoFlow(Cliente)
      } else if (ctx.body == '4') {
          await sock.sendMessage(ctx.key.remoteJid, { location: { degreesLatitude: -34.65693027316358, degreesLongitude: -58.56245348955204 } });
          await delay(1000);
          await sock.sendMessage(ctx.key.remoteJid, { text: '*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' });
          await sock.sendMessage(ctx.key.remoteJid, { video: readFileSync("video.mp4"), caption: "Showroom", gifPlayback: true });
          gotoFlow(Menuflow);
    } else if (ctx.body == '5') {
           await sock.sendMessage(ctx.key.remoteJid, { text: 'Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' });
         gotoFlow(Menuflow);
    } else if (ctx.body == '6') {
         await sock.sendMessage(ctx.key.remoteJid, { text: 'WEB: https://espejoselfiemirror.com.ar' });
         gotoFlow(Menuflow);
     } else if (ctx.body == '0') {
         await sock.sendMessage(ctx.key.remoteJid, { text: 'A todos los clientes compradores de Selfie Mirror, Los invitamos a participar de la nueva modalidad SOCIOS ... ' });
         await sock.sendMessage(ctx.key.remoteJid, { text: 'WEB: https://espejoselfiemirror.com.ar\n\nDe qué se trata?\nDebido a la gran demanda del servicio, estafas y lamentable servicio brindado por muchos proveedores tomamos la decisión de calificar y recomendar a quienes brinden un buen servicio, además podrán aprovechar nuestras campañas de publicidad constantes a nivel nacional. \n\n También dispondrás de un subdominio tipo representante.selfiemirror.com.ar, este mostrará el servicio que cada uno brinde. \n\n Envía un mensaje al asesor para participar' }, delay(1000));
         gotoFlow(Menuflow);
     } else {
     return fallBack({ body: 'Esta respuesta es automática y solo acepta una respuesta numérica. Responde 1 para *Alquiler*, 2 para *Venta* o 3 para derivarlo a un *Asesor*. Gracias' });
     }}, [flowVenta, flowsAlquiler, Cliente]);
                                    

////////////////////////////////////////////////////////////////////////////////////////


  const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowVenta, flowsAlquiler, Cliente, Menuflow, audiono])
    const adapterProvider = createProvider(BaileysProvider)
  
    createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    })
  
    QRPortalWeb()
  }
  
  main()
  