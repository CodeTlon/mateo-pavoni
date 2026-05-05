import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
} from '@react-email/components'

interface ContactTemplateProps {
  name: string
  email: string
  message: string
}

export default function ContactTemplate({ name, email, message }: ContactTemplateProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: '#fbf8fa', fontFamily: 'Inter, Arial, sans-serif', margin: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(30,41,59,0.08)' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#091426', padding: '32px 40px' }}>
            <Heading style={{ color: '#ffffff', fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
              MP.DEV
            </Heading>
            <Text style={{ color: '#8590a6', fontSize: '12px', margin: '4px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Nuevo mensaje desde el portfolio
            </Text>
          </Section>

          {/* Content */}
          <Section style={{ padding: '32px 40px' }}>
            <Text style={{ color: '#45474c', fontSize: '14px', margin: '0 0 24px' }}>
              Recibiste un nuevo mensaje de contacto:
            </Text>

            <div style={{ backgroundColor: '#f5f3f4', borderRadius: '6px', padding: '20px 24px', marginBottom: '24px' }}>
              <Text style={{ color: '#75777d', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                Nombre
              </Text>
              <Text style={{ color: '#1b1b1d', fontSize: '16px', fontWeight: 600, margin: '0 0 16px' }}>
                {name}
              </Text>

              <Text style={{ color: '#75777d', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                Email
              </Text>
              <Text style={{ color: '#006591', fontSize: '14px', margin: '0 0 16px' }}>
                {email}
              </Text>

              <Text style={{ color: '#75777d', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                Mensaje
              </Text>
              <Text style={{ color: '#1b1b1d', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {message}
              </Text>
            </div>

            <Hr style={{ borderColor: '#e4e2e3', margin: '0 0 24px' }} />

            <Text style={{ color: '#75777d', fontSize: '12px', margin: 0 }}>
              Responder directamente a: {email}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#091426', padding: '16px 40px' }}>
            <Text style={{ color: '#45474c', fontSize: '11px', margin: 0, letterSpacing: '0.06em' }}>
              Built by CodeTlon Software Factory
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
