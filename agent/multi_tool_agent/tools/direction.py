from typing import Dict
from google.adk.tools import FunctionTool, ToolContext
import urllib.parse

# Reference to the LinkedIn Local Nigeria Knowledge Base (assumed to be imported or available)
LLN_KNOWLEDGE = {
    "venue": {
        "name": "Trinity Towers",
        "address": "Trinity Towers, Chief Yesufu Abiodun Oniru Road, Lagos, Nigeria",
        "coordinates": {"lat": 6.4280, "lng": 3.4219},
        "landmark": "Chief Yesufu Abiodun Oniru Road area",
        "parking": "Available nearby",
        "accessibility": "Accessible venue",
        "capacity": "5,000 attendees",
        "contact": "Contact via linkedinlocalnigeria.com",
    },
    "transportation": {
        "lagride_discount": "50% off with coupon code: LLN2025",
        "lagride_info": "Book your ride using the Lagride app with code LLN2025 for a 50% discount, as Lagride is our official mobility sponsor",
        "public_transport": "BRT to CMS, then taxi or Lagride to Oniru area",
        "from_airport": "45-90 minutes from Murtala Muhammed Airport depending on traffic",
        "from_mainland": "30-60 minutes via Third Mainland Bridge or Carter Bridge",
        "from_island": "15-30 minutes within Victoria Island/Ikoyi area",
        "parking": "Available nearby",
        "ride_sharing": "Coordinate rides with other attendees via WhatsApp groups",
        "early_transport": "Book rides 30 minutes earlier during rush hours",
        "return_transport": "Book return rides before 4:00 PM to avoid delays"
    },
    "contact_info": {
        "website": "https://linkedinlocalnigeria.com",
        "email": "info@linkedinlocalnigeria.com",
        "whatsapp": "+234 XXX XXX XXXX",
        "emergency_contact": "Event day emergency: +234 XXX XXX XXXX"
    }
}

def get_custom_directions(from_location: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get custom directions to LinkedIn Local Nigeria venue with a Google Maps link.
    Emphasizes Lagride as the official mobility sponsor for all attendees, especially those traveling from outside Lagos (e.g., Ibadan) or needing precise navigation.
    """
    try:
        venue = LLN_KNOWLEDGE["venue"]
        transport = LLN_KNOWLEDGE["transportation"]
        
        # Generate Google Maps link using venue coordinates
        destination = f"{venue['coordinates']['lat']},{venue['coordinates']['lng']}"
        maps_base_url = "https://www.google.com/maps/dir/?api=1"
        encoded_destination = urllib.parse.quote(f"{venue['name']}, {venue['address']}")
        
        if not from_location or from_location.strip() == "":
            maps_link = f"{maps_base_url}&destination={destination}&travelmode=driving"
            return {
                "message": f"**Directions to LinkedIn Local Nigeria Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps Navigation:**\n"
                          f"Enter your starting point in Google Maps: [Get Directions]({maps_link})\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Download the Lagride app and use code LLN2025 for a 50% discount\n\n"
                          f"**🚌 Other Options:**\n"
                          f"• **Public Transport:** {transport['public_transport']}\n"
                          f"• **Personal Car:** Navigate to '{venue['address']}' with Google Maps\n\n"
                          f"**🅿️ Parking:** {transport['parking']}\n\n"
                          f"**📞 Need Help?**\n"
                          f"WhatsApp: {LLN_KNOWLEDGE['contact_info']['whatsapp']}\n"
                          f"Email: {LLN_KNOWLEDGE['contact_info']['email']}\n\n"
                          f"*Specify your starting location (e.g., 'Ibadan', 'Abuja', 'Port Harcourt') for tailored advice!*"
            }
        
        from_location_encoded = urllib.parse.quote(from_location)
        maps_link = f"{maps_base_url}&origin={from_location_encoded}&destination={destination}&travelmode=driving"
        
        location_lower = from_location.lower()
        
        # Tailored directions for specific Lagos locations
        if any(word in location_lower for word in ['airport', 'murtala', 'muhammed']):
            return {
                "message": f"**Directions from Lagos Airport to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps:** [Navigate from Lagos Airport]({maps_link})\n\n"
                          f"🕐 **Travel Time:** {transport['from_airport']}\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Book via the Lagride app for a discounted ride\n\n"
                          f"**🚌 Alternative Routes:**\n"
                          f"• **Route:** Airport Road → Third Mainland Bridge → Oniru area\n"
                          f"• **Public Transport:** Taxi or Lagride from airport to venue\n\n"
                          f"**💰 Cost Estimates with Lagride:**\n"
                          f"• Discounted rides: ₦1,500 - ₦4,000 (with code LLN2025)\n\n"
                          f"**⚠️ Traffic Tips:**\n"
                          f"• Leave 2 hours early during rush hours (7-10 AM)\n"
                          f"• Book Lagride 30 minutes in advance\n"
                          f"• Consider staying overnight near venue if arriving late\n\n"
                          f"**📞 Support:** {LLN_KNOWLEDGE['contact_info']['whatsapp']}"
            }
        
        elif any(word in location_lower for word in ['mainland', 'ikeja', 'surulere', 'yaba', 'mushin', 'maryland', 'gbagada']):
            return {
                "message": f"**Directions from Lagos Mainland ({from_location}) to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps:** [Navigate from {from_location}]({maps_link})\n\n"
                          f"🕐 **Travel Time:** {transport['from_mainland']}\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Book via the Lagride app for a discounted ride\n\n"
                          f"**🚌 Other Options:**\n"
                          f"• **Public Transport:** {transport['public_transport']} (use Lagride for the final leg)\n"
                          f"• **Personal Car:** Third Mainland/Carter Bridge → Oniru\n\n"
                          f"**💰 Cost Estimates with Lagride:**\n"
                          f"• Discounted rides: ₦1,000 - ₦3,000 (with code LLN2025)\n\n"
                          f"**📍 Parking:** Available near venue (₦1,000-₦2,000/day)\n"
                          f"**⏰ Best Departure Times:** 6:30-7:00 AM to arrive by 8:00 AM\n\n"
                          f"**📞 Support:** {LLN_KNOWLEDGE['contact_info']['whatsapp']}"
            }
        
        elif any(word in location_lower for word in ['island', 'ikoyi', 'lekki', 'ajah', 'vi', 'victoria island']):
            return {
                "message": f"**Directions from Lagos Island ({from_location}) to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps:** [Navigate from {from_location}]({maps_link})\n\n"
                          f"🕐 **Travel Time:** {transport['from_island']}\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Book via the Lagride app for a discounted ride\n\n"
                          f"**🚌 Other Options:**\n"
                          f"• **Taxi:** Direct route within VI area (Lagride preferred)\n"
                          f"• **Walk + Lagride:** If staying very close in VI\n\n"
                          f"**💰 Cost with Lagride:**\n"
                          f"• Discounted rides: ₦500 - ₦1,500 (with code LLN2025)\n\n"
                          f"**✅ Advantages:**\n"
                          f"• Shortest distance - you're already on the Island!\n"
                          f"• Less traffic compared to mainland routes\n"
                          f"• Easy return journey after event\n\n"
                          f"**📞 Support:** {LLN_KNOWLEDGE['contact_info']['whatsapp']}"
            }
        
        elif any(word in location_lower for word in ['ibadan', 'oyo']):
            return {
                "message": f"**Directions from Ibadan to LinkedIn Local Nigeria Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps Navigation:**\n"
                          f"[Get Directions from Ibadan]({maps_link})\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Use Lagride for travel within Lagos after arriving from Ibadan\n\n"
                          f"**🛫 Travel Options from Ibadan:**\n"
                          f"1. **Interstate Bus:**\n"
                          f"   • Book a bus to Lagos (e.g., GUO, ABC Transport) to terminals like Jibowu or Oshodi (2-3 hours)\n"
                          f"   • From terminal, book Lagride to Oniru (30-60 min, ₦1,000-₦3,000 with LLN2025 discount)\n"
                          f"2. **Personal Car:**\n"
                          f"   • Drive via Lagos-Ibadan Expressway to Lagos (2-3 hours)\n"
                          f"   • Navigate to '{venue['address']}' with Google Maps\n"
                          f"   • Parking available near venue (₦1,000-₦2,000/day)\n"
                          f"3. **Flight (Less Common):**\n"
                          f"   • Fly to Murtala Muhammed Airport, then book Lagride (45-90 min, ₦1,500-₦4,000 with discount)\n\n"
                          f"**💡 Tips for Ibadan Attendees:**\n"
                          f"• **Plan Early:** Book buses early to secure seats; aim to arrive in Lagos by 6:30 AM\n"
                          f"• **Accommodation:** Consider staying in Victoria Island or Ikoyi (15-30 min to venue via Lagride)\n"
                          f"• **Traffic:** Lagos traffic can be heavy; leave Ibadan by 5:00 AM to reach venue by 8:00 AM\n"
                          f"• **Ride Booking:** Pre-book Lagride with code LLN2025 for discounted travel in Lagos\n\n"
                          f"**📞 Need Assistance?**\n"
                          f"WhatsApp: {LLN_KNOWLEDGE['contact_info']['whatsapp']}\n"
                          f"Email: {LLN_KNOWLEDGE['contact_info']['email']}\n"
                          f"Website: {LLN_KNOWLEDGE['contact_info']['website']}\n\n"
                          f"*Use the Google Maps link for real-time directions and book Lagride for your Lagos travel!*"
            }
        
        else:
            # For attendees from other locations outside Lagos
            return {
                "message": f"**Directions from {from_location} to LinkedIn Local Nigeria Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps Navigation:**\n"
                          f"[Get Directions from {from_location}]({maps_link})\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Use Lagride for travel within Lagos to the venue\n\n"
                          f"**🛫 Travel Options for Long-Distance Attendees:**\n"
                          f"1. **Flight to Lagos:** Arrive at Murtala Muhammed Airport, then book Lagride (45-90 min to venue, ₦1,500-₦4,000 with LLN2025 discount)\n"
                          f"2. **Interstate Bus/Travel:** Arrive at Lagos terminals (e.g., Jibowu, Oshodi), then book Lagride to Oniru (30-60 min, ₦1,000-₦3,000 with discount)\n"
                          f"3. **Personal Car:** Use Google Maps to navigate to '{venue['address']}'\n\n"
                          f"**💡 Tips for Out-of-Town Attendees:**\n"
                          f"• **Plan Early:** Book flights or buses well in advance to secure seats\n"
                          f"• **Accommodation:** Consider staying in Victoria Island or Ikoyi for proximity (15-30 min to venue via Lagride)\n"
                          f"• **Traffic:** Lagos traffic can be heavy; leave 1-2 hours early, especially for morning travel\n"
                          f"• **Ride Booking:** Pre-book Lagride with code LLN2025 for smoother travel\n"
                          f"• **Parking:** Available near venue (₦1,000-₦2,000/day)\n\n"
                          f"**📞 Need Assistance?**\n"
                          f"WhatsApp: {LLN_KNOWLEDGE['contact_info']['whatsapp']}\n"
                          f"Email: {LLN_KNOWLEDGE['contact_info']['email']}\n"
                          f"Website: {LLN_KNOWLEDGE['contact_info']['website']}\n\n"
                          f"*Use the Google Maps link for real-time, turn-by-turn directions and book Lagride for your Lagos travel!*"
            }
    
    except Exception as e:
        maps_link = f"{maps_base_url}&destination={destination}&travelmode=driving"
        return {
            "message": f"**Directions to LinkedIn Local Nigeria Venue from {from_location or 'Your Location'}:**\n\n"
                      f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                      f"🗺️ **Google Maps Navigation:**\n"
                      f"[Get Directions]({maps_link})\n\n"
                      f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                      f"• {transport['lagride_info']}\n"
                      f"• Download the Lagride app and use code LLN2025 for a 50% discount\n\n"
                      f"**💡 Travel Tip:**\n"
                      f"• Enter '{venue['address']}' in the Lagride app or Google Maps for precise navigation\n"
                      f"• For long-distance travel, book a bus or flight to Lagos, then use Lagride for the final leg\n\n"
                      f"**📞 Need Help?**\n"
                      f"WhatsApp: {LLN_KNOWLEDGE['contact_info']['whatsapp']}\n"
                      f"Email: {LLN_KNOWLEDGE['contact_info']['email']}\n\n"
                      f"*Safe journey to the event!*"
        }

# Register the tool
custom_directions_tool = FunctionTool(get_custom_directions)