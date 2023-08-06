import html from '../utils/html.js'
import Date from './date.js'

export default function Duration(startDate, endDate) {
  if (!startDate) {
    return "";
  }
  return html`${Date(startDate)} – ${endDate ? Date(endDate) : 'Present'}`
}
