import post_message from './message_helper.js'

const template_blueprint = {
	messaging_product: 'whatsapp',
	type: 'template',
	to: null,
	template: {
		name: null,
		language: {
			code: null,
		},
	},
}

const text_blueprint = {
	messaging_product: 'whatsapp',
	type: 'text',
	to: null,
	text: {
		body: null,
	},
}

export default function message(number) {
	let blueprint

	function template() {
		blueprint = template_blueprint
		blueprint.to = number
		return {
			atendimento_finalizado,
			hello_world,
		}
	}

	function atendimento_finalizado() {
		blueprint.template.name = 'atendimento_finalizado'
		blueprint.template.language.code = 'pt_BR'
		return post_message(blueprint)
	}

	function hello_world() {
		blueprint.template.name = 'hello_world'
		blueprint.template.language.code = 'en_US'
		return post_message(blueprint)
	}

	function text(param) {
		blueprint = text_blueprint
		blueprint.to = number
		blueprint.text.body = typeof param == 'string' ? param : text_template(param)
		return post_message(blueprint)
	}

	return {
		template,
		text,
	}
}

function text_template({ doutor, paciente, link, status }) {
	const ola = `Olá, ${doutor}!\n`
	const planejamento = link ? `\n\nConfira abaixo o link do planejamento completo:\n\n${link}` : ''
	const opcoes = {
		'Planejamento Finalizado': `Seu atendimento com ${paciente} foi finalizado com sucesso!`,
		Concluído: `Seu planejamento com ${paciente} foi concluido com sucesso!`,
		Aguardando: `Seu planejamento com ${paciente} foi colocado em aguardo.`,
		'Pagamento Confirmado': `Seu planejamento com ${paciente} foi pago com sucesso.`,
	}
	return ola + opcoes[status] + planejamento
}
