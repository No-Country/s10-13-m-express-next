import React from 'react'

import TabBar from '../../../components/TabBar'

function InstitutionalPage() {
  const content = [
    {
      title: 'Terminos y Condiciones',
      content: <Terminosycondiciones />
    },
    {
      title: 'Politica de privacidad',
      content: <Politicadeprivacidad />
    }
  ]

  return (
    <>
      <div className='bg-white'>
        <h1 className='leading-30 mx-auto mb-8  w-11/12 text-2xl font-bold text-pink-500'>Institucional</h1>
        <TabBar content={content} />
      </div>
    </>
  )
}

export default InstitutionalPage

function Terminosycondiciones() {
  return (
    <div className='mx-auto w-11/12'>
      <h4 className='py-3 text-base font-semibold'>Terminos y condiciones</h4>
      <p>
        Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Unión Solidaria,
        ubicado en www.unionsolidaria.com.
        <br />
        Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Unión
        Solidaria si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
        <br />
        <br />
      </p>
      <span className='font-semibold'>Cookies:</span>
      <p>
        El sitio web utiliza cookies para ayudar a personalizar tu experiencia en línea. Al acceder a Unión Solidaria,
        aceptaste utilizar las cookies necesarias. Una cookie es un archivo de texto que un servidor de páginas web
        coloca en tu disco duro. Las cookies no se pueden utilizar para ejecutar programas o enviar virus a tu
        computadora. Las cookies se te asignan de forma exclusiva y solo un servidor web en el dominio que emitió la
        cookie puede leerlas. Podemos utilizar cookies para recopilar, almacenar y rastrear información con fines
        estadísticos o de marketing para operar nuestro sitio web. Tienes la capacidad de aceptar o rechazar cookies
        opcionales. Hay algunas cookies obligatorias que son necesarias para el funcionamiento de nuestro sitio web.
        Estas cookies no requieren tu consentimiento ya que siempre funcionan. Ten en cuenta que al aceptar las cookies
        requeridas, también aceptas las cookies de terceros, que podrían usarse a través de servicios proporcionados por
        terceros si utilizas dichos servicios en nuestro sitio web, por ejemplo, una ventana de visualización de video
        proporcionada por terceros e integrada en nuestro sitio web.
      </p>
      <br />
      <span className='font-semibold'>Licencia:</span>
      <p>
        A menos que se indique lo contrario, Unión Solidaria y/o sus licenciantes poseen los derechos de propiedad
        intelectual de todo el material en Unión Solidaria. Todos los derechos de propiedad intelectual son reservados.
        Puedes acceder desde Unión Solidaria para tu uso personal sujeto a las restricciones establecidas en estos
        términos y condiciones.
        <br />
        No debes:
      </p>

      <li>Copiar o volver a publicar material de Unión Solidaria </li>
      <li>Vender, alquilar o sublicenciar material de Unión Solidaria</li>
      <li> Reproducir, duplicar o copiar material de Unión Solidaria </li>
      <li>Redistribuir contenido de Unión Solidaria</li>
      <br />

      <p>
        Este acuerdo comenzará el fecha presente. Partes de este sitio web ofrecen a los usuarios la oportunidad de
        publicar e intercambiar opiniones e información en determinadas áreas. Unión Solidaria no filtra, edita, publica
        ni revisa los comentarios antes de su presencia en el sitio web. Los comentarios no reflejan los puntos de vista
        ni las opiniones de Unión Solidaria, sus agentes y/o afiliados. Los comentarios reflejan los puntos de vista y
        opiniones de la persona que publica. En la medida en que lo permitan las leyes aplicables, Unión Solidaria no
        será responsable de los comentarios ni de ninguna responsabilidad, daños o gastos causados o sufridos como
        resultado de cualquier uso o publicación o apariencia de comentarios en este sitio web. Unión Solidaria se
        reserva el derecho de monitorear todos los comentarios y eliminar los que puedan considerarse inapropiados,
        ofensivos o que incumplan estos Términos y Condiciones...
      </p>
    </div>
  )
}

function Politicadeprivacidad() {
  return (
    <div className='mx-auto w-11/12'>
      <h4 className='py-3 text-base font-semibold'>Politica de privacidad</h4>
      <p>
        El sitio web Unión Solidaria es propiedad de Unión Solidaria, que es un controlador de datos de tus datos
        personales.
        <br />
        <br />
        Hemos adoptado esta Política de privacidad, que determina cómo procesamos la información recopilada por Unión
        Solidaria, que también proporciona las razones por las que debemos recopilar ciertos datos personales sobre ti.
        Por lo tanto, debes leer esta Política de privacidad antes de usar el sitio web de Unión Solidaria. Cuidamos tus
        datos personales y nos comprometemos a garantizar su confidencialidad y seguridad.
        <br />
        <br />
      </p>
      <span className='font-semibold'>Información personal que recopilamos:</span>
      <p>
        Cuando visitas Unión Solidaria, recopilamos automáticamente cierta información sobre tu dispositivo, incluida
        información sobre tu navegador web, dirección IP, zona horaria y algunas de las cookies instaladas en tu
        dispositivo. Además, a medida que navegas, recopilamos información sobre las páginas web individuales o los
        productos que ves, qué sitios web o términos de búsqueda te remitieron a la web y cómo interactúas. Nos
        referimos a esta información recopilada automáticamente como "Información del dispositivo". Además, podemos
        recopilar los datos personales que nos proporcionas (incluidos, entre otros, nombre, apellido, dirección,
        información de pago, etc.) durante el registro para poder cumplir con el acuerdo.
      </p>
      <br />
      <span className='font-semibold'>¿Por qué procesamos tus datos?</span>
      <p>
        Nuestra máxima prioridad es la seguridad de los datos del cliente y, como tal, podemos procesar solo los datos
        mínimos del usuario, solo en la medida en que sea absolutamente necesario para mantener el sitio web. La
        información recopilada automáticamente se utiliza solo para identificar casos potenciales de abuso y establecer
        información estadística sobre el uso del sitio web. Esta información estadística no se agrega de tal manera que
        identifique a ningún usuario en particular del sistema. Puedes visitar la web sin decirnos quién eres ni revelar
        ninguna información por la cual alguien pueda identificarte como una persona específica. Sin embargo, si deseas
        utilizar algunas de las funciones del sitio web, o deseas recibir nuestro boletín informativo o proporcionar
        otros detalles al completar un formulario, puedes proporcionarnos datos personales, como tu correo electrónico,
        nombre, apellido, ciudad de residencia, organización y número de teléfono. Puedes optar por no proporcionar tus
        datos personales, pero es posible que no puedas aprovechar algunas de las funciones del sitio web. Por ejemplo,
        no podrás recibir nuestro boletín ni contactarnos directamente desde el sitio web. Los usuarios que no estén
        seguros de qué información es obligatoria pueden ponerse en contacto con nosotros a través de
        info@unionsolidaria.com (...)
      </p>
    </div>
  )
}
