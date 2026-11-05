import { describe, it, expect } from 'vitest'
import { buildWhatsAppMessage, buildWhatsAppLink } from '../src/lib/whatsapp.js'

describe('buildWhatsAppMessage', () => {
  it('builds a formatted enquiry message', () => {
    const message = buildWhatsAppMessage({
      fullName: ' Adaeze Okafor ',
      phone: '+2348012345678',
      email: 'ada@example.com',
      service: 'Physiotherapy',
      ageGroup: 'Adult',
      description: 'Post-stroke recovery, left side weakness.',
      contactMethod: 'Phone',
    })

    expect(message).toContain('Hello BACR - I would like to book an appointment.')
    expect(message).toContain('Name: Adaeze Okafor')
    expect(message).toContain('Phone: +2348012345678')
    expect(message).toContain('Service required: Physiotherapy')
    expect(message).toContain('Patient age group: Adult')
    expect(message).toContain('Preferred contact method: Phone')
    expect(message).toContain('Post-stroke recovery, left side weakness.')
  })

  it('defaults the service to Not Sure', () => {
    const message = buildWhatsAppMessage({ fullName: 'Tunde', service: '' })
    expect(message).toContain('Service required: Not Sure')
  })

  it('handles missing details without throwing', () => {
    expect(() => buildWhatsAppMessage()).not.toThrow()
    expect(buildWhatsAppMessage(undefined)).toContain('Name: ')
  })
})

describe('buildWhatsAppLink', () => {
  it('returns empty string when no number is configured', () => {
    expect(buildWhatsAppLink('', 'hello')).toBe('')
    expect(buildWhatsAppLink(undefined, 'hello')).toBe('')
  })

  it('strips formatting from the number and encodes the message', () => {
    const link = buildWhatsAppLink('+234 801 234 5678', 'Hi there & welcome')
    expect(link.startsWith('https://wa.me/2348012345678?text=')).toBe(true)
    expect(link).toContain(encodeURIComponent('Hi there & welcome'))
  })
})
