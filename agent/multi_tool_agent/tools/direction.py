from typing import Dict
from google.adk.tools import FunctionTool, ToolContext
import urllib.parse

# LinkedIn Local Nigeria Knowledge Base
LLN_KNOWLEDGE = {
    "venue": {
        "name": "Trinity Towers",
        "address": "Trinity Towers, Chief Yesufu Abiodun Oniru Road, Lagos, Nigeria",
        "landmark": "Chief Yesufu Abiodun Oniru Road area",
        "parking": "Available nearby",
        "accessibility": "Accessible venue",
        "capacity": "5,000 attendees",
    },
    "bus_stops": {
        "sandfield": {
            "name": "Sandfield Bus Stop",
            "description": "Nearest bus stop to the venue",
            "landmarks": ["Oriental Hotel", "Four Points by Sheraton"],
            "distance_to_venue": "5-10 minutes walk or short ride",
            "coordinates": "6.4290,3.4210"  # Approximate coordinates for Sandfield area
        }
    },
    "transportation": {
        "lagride_discount": "50% off with coupon code: LLN2025",
        "lagride_info": "Book your ride using the Lagride app with code LLN2025 for a 50% discount, as Lagride is our official mobility sponsor",
        "public_transport": "BRT to CMS, then taxi or Lagride to Oniru area. Get off at Sandfield Bus Stop (near Oriental Hotel/Four Points by Sheraton)",
        "from_airport": "45-90 minutes from Murtala Muhammed Airport depending on traffic",
        "from_mainland": "30-60 minutes via Third Mainland Bridge or Carter Bridge",
        "from_island": "15-30 minutes within Victoria Island/Ikoyi area",
        "parking": "Available nearby",
        "ride_sharing": "Coordinate rides with other attendees via event groups",
        "early_transport": "Book rides 30 minutes earlier during rush hours",
        "return_transport": "Book return rides before 4:00 PM to avoid delays"
    },
    "contact_info": {
        "website": "https://linkedinlocalnigeria.com"
    }
}

def get_custom_directions(from_location: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get custom directions to LinkedIn Local Nigeria venue with Google Maps links.
    Includes nearest bus stop information and emphasizes Lagride as the official mobility sponsor.
    """
    try:
        venue = LLN_KNOWLEDGE["venue"]
        transport = LLN_KNOWLEDGE["transportation"]
        bus_stop = LLN_KNOWLEDGE["bus_stops"]["sandfield"]
        
        # Generate Google Maps link using venue ADDRESS (not coordinates)
        maps_base_url = "https://www.google.com/maps/dir/?api=1"
        encoded_venue_address = urllib.parse.quote(venue['address'])
        encoded_bus_stop = urllib.parse.quote(f"Sandfield Bus Stop, Victoria Island, Lagos, Nigeria")
        
        # Bus stop directions link
        bus_stop_maps_link = f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote('Sandfield Bus Stop, near Oriental Hotel, Victoria Island, Lagos')}"
        
        if not from_location or from_location.strip() == "":
            venue_maps_link = f"{maps_base_url}&destination={encoded_venue_address}&travelmode=driving"
            return {
                "message": f"**Directions to LinkedIn Local Nigeria Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}\n"
                          f"📮 **Address:** {venue['address']}\n\n"
                          f"🗺️ **Google Maps Navigation:**\n"
                          f"[Get Directions to Trinity Towers]({venue_maps_link})\n\n"
                          f"**🚏 Nearest Bus Stop:**\n"
                          f"• **{bus_stop['name']}** - {bus_stop['distance_to_venue']}\n"
                          f"• Located near: {', '.join(bus_stop['landmarks'])}\n"
                          f"• [View Sandfield Bus Stop on Map]({bus_stop_maps_link})\n"
                          f"• From Sandfield, take a short walk or Lagride to Trinity Towers\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Download the Lagride app and use code **LLN2025** for 50% off\n\n"
                          f"**🚌 Public Transport:**\n"
                          f"• {transport['public_transport']}\n\n"
                          f"**🅿️ Parking:** {transport['parking']}\n\n"
                          f"**💡 Need Specific Directions?**\n"
                          f"Tell me your starting location (e.g., 'Ibadan', 'Ikeja', 'Airport') for tailored directions!"
            }
        
        from_location_encoded = urllib.parse.quote(from_location)
        venue_maps_link = f"{maps_base_url}&origin={from_location_encoded}&destination={encoded_venue_address}&travelmode=driving"
        bus_stop_route_link = f"{maps_base_url}&origin={from_location_encoded}&destination={encoded_bus_stop}&travelmode=driving"
        
        location_lower = from_location.lower()
        
        # Tailored directions for specific Lagos locations
        if any(word in location_lower for word in ['airport', 'murtala', 'muhammed', 'ikeja airport']):
            return {
                "message": f"**Directions from Lagos Airport to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Direct Route:**\n"
                          f"[Navigate from Airport to Trinity Towers]({venue_maps_link})\n\n"
                          f"🕐 **Travel Time:** {transport['from_airport']}\n\n"
                          f"**🚏 Via Bus Stop (Public Transport):**\n"
                          f"• Get off at **{bus_stop['name']}** (near {', '.join(bus_stop['landmarks'])})\n"
                          f"• [Route to Sandfield Bus Stop]({bus_stop_route_link})\n"
                          f"• [View Bus Stop Location]({bus_stop_maps_link})\n"
                          f"• From Sandfield, take Lagride or walk {bus_stop['distance_to_venue']} to venue\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Book via the Lagride app for door-to-door service\n"
                          f"• Use code **LLN2025** for 50% discount\n\n"
                          f"**🛣️ Route:**\n"
                          f"Airport Road → Third Mainland Bridge → Victoria Island → Oniru area\n\n"
                          f"**💰 Cost Estimates with Lagride:**\n"
                          f"• Discounted fare: ₦1,500 - ₦4,000 (with code LLN2025)\n\n"
                          f"**⚠️ Traffic Tips:**\n"
                          f"• Leave 2 hours early during rush hours (7-10 AM, 4-7 PM)\n"
                          f"• Book Lagride 30 minutes in advance\n"
                          f"• Consider staying overnight near venue if arriving late\n\n"
                          f"**📞 Website:** {LLN_KNOWLEDGE['contact_info']['website']}"
            }
        
        elif any(word in location_lower for word in ['mainland', 'ikeja', 'surulere', 'yaba', 'mushin', 'maryland', 'gbagada', 'oshodi', 'jibowu']):
            return {
                "message": f"**Directions from Lagos Mainland ({from_location}) to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Direct Route:**\n"
                          f"[Navigate from {from_location} to Trinity Towers]({venue_maps_link})\n\n"
                          f"🕐 **Travel Time:** {transport['from_mainland']}\n\n"
                          f"**🚏 Via Bus Stop (Public Transport):**\n"
                          f"• Alight at **{bus_stop['name']}** (near {', '.join(bus_stop['landmarks'])})\n"
                          f"• [Route to Sandfield Bus Stop]({bus_stop_route_link})\n"
                          f"• [View Bus Stop Location]({bus_stop_maps_link})\n"
                          f"• From Sandfield, take Lagride or walk {bus_stop['distance_to_venue']} to venue\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Use code **LLN2025** for 50% discount\n\n"
                          f"**🚌 Public Transport Option:**\n"
                          f"• {transport['public_transport']}\n"
                          f"• Tell the conductor \"Sandfield, Oriental Hotel area\"\n\n"
                          f"**🛣️ Route (If Driving):**\n"
                          f"Third Mainland Bridge/Carter Bridge → Victoria Island → Oniru → Trinity Towers\n\n"
                          f"**💰 Cost Estimates:**\n"
                          f"• Lagride (with LLN2025): ₦1,000 - ₦3,000\n"
                          f"• BRT + Lagride final leg: ₦500 - ₦1,500 total\n\n"
                          f"**🅿️ Parking:** Available near venue (₦1,000-₦2,000/day)\n\n"
                          f"**⏰ Best Departure Times:** Leave by 6:30-7:00 AM to arrive by 8:00 AM\n\n"
                          f"**📞 Website:** {LLN_KNOWLEDGE['contact_info']['website']}"
            }
        
        elif any(word in location_lower for word in ['island', 'ikoyi', 'lekki', 'ajah', 'vi', 'victoria island', 'oniru', 'banana island']):
            return {
                "message": f"**Directions from Lagos Island ({from_location}) to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Direct Route:**\n"
                          f"[Navigate from {from_location} to Trinity Towers]({venue_maps_link})\n\n"
                          f"🕐 **Travel Time:** {transport['from_island']}\n\n"
                          f"**🚏 Nearest Bus Stop:**\n"
                          f"• **{bus_stop['name']}** - {bus_stop['distance_to_venue']}\n"
                          f"• Near: {', '.join(bus_stop['landmarks'])}\n"
                          f"• [View Bus Stop Location]({bus_stop_maps_link})\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Use code **LLN2025** for 50% discount\n"
                          f"• Book via the Lagride app for quick pickup\n\n"
                          f"**🚌 Alternative:**\n"
                          f"• Take a taxi or keke to Sandfield Bus Stop, then walk/Lagride to venue\n\n"
                          f"**💰 Cost with Lagride:**\n"
                          f"• Discounted fare: ₦500 - ₦1,500 (with code LLN2025)\n\n"
                          f"**✅ Advantages:**\n"
                          f"• You're already on the Island - shortest route!\n"
                          f"• Minimal traffic compared to mainland routes\n"
                          f"• Easy return journey after event\n\n"
                          f"**📞 Website:** {LLN_KNOWLEDGE['contact_info']['website']}"
            }
        
        elif any(word in location_lower for word in ['ibadan', 'oyo']):
            return {
                "message": f"**Directions from Ibadan to LinkedIn Local Nigeria Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps Navigation:**\n"
                          f"[Get Directions from Ibadan to Trinity Towers]({venue_maps_link})\n\n"
                          f"**🚏 Nearest Bus Stop in Lagos:**\n"
                          f"• **{bus_stop['name']}** (near {', '.join(bus_stop['landmarks'])})\n"
                          f"• [View Bus Stop Location]({bus_stop_maps_link})\n"
                          f"• From Sandfield, take Lagride or walk {bus_stop['distance_to_venue']} to venue\n\n"
                          f"**🛫 Travel Options from Ibadan:**\n\n"
                          f"**1. Interstate Bus + Lagride:**\n"
                          f"   • Book a bus to Lagos (GUO, ABC Transport) → Jibowu/Oshodi terminal (2-3 hours)\n"
                          f"   • From terminal, book Lagride to venue or to Sandfield Bus Stop\n"
                          f"   • Use code **LLN2025** for 50% off Lagride (₦1,000-₦3,000)\n\n"
                          f"**2. Personal Car:**\n"
                          f"   • Drive via Lagos-Ibadan Expressway (2-3 hours)\n"
                          f"   • Follow Google Maps to '{venue['address']}'\n"
                          f"   • Parking available (₦1,000-₦2,000/day)\n\n"
                          f"**3. Flight (if applicable):**\n"
                          f"   • Fly to Murtala Muhammed Airport\n"
                          f"   • Book Lagride to venue (45-90 min, ₦1,500-₦4,000 with LLN2025)\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Download app and use code **LLN2025** for 50% discount\n\n"
                          f"**💡 Tips for Ibadan Attendees:**\n"
                          f"• **Early Start:** Leave Ibadan by 5:00 AM to reach venue by 8:00 AM\n"
                          f"• **Book Early:** Secure bus seats in advance for morning departure\n"
                          f"• **Accommodation:** Consider Victoria Island/Ikoyi hotels (15-30 min to venue)\n"
                          f"• **Traffic Alert:** Lagos traffic peaks 7-10 AM; plan accordingly\n"
                          f"• **Ride Pre-booking:** Book Lagride 30 mins before you need it\n\n"
                          f"**📞 Website:** {LLN_KNOWLEDGE['contact_info']['website']}\n\n"
                          f"*Safe travels from Ibadan! Use Lagride with code LLN2025 for discounted Lagos rides.*"
            }
        
        else:
            # For attendees from other locations outside Lagos
            return {
                "message": f"**Directions from {from_location} to LinkedIn Local Nigeria Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                          f"🗺️ **Google Maps Navigation:**\n"
                          f"[Get Directions from {from_location} to Trinity Towers]({venue_maps_link})\n\n"
                          f"**🚏 Nearest Bus Stop in Lagos:**\n"
                          f"• **{bus_stop['name']}** (near {', '.join(bus_stop['landmarks'])})\n"
                          f"• [View Bus Stop Location]({bus_stop_maps_link})\n"
                          f"• From Sandfield, take Lagride or walk {bus_stop['distance_to_venue']} to venue\n\n"
                          f"**🛫 Travel Options for Long-Distance Attendees:**\n\n"
                          f"**1. Flight to Lagos:**\n"
                          f"   • Arrive at Murtala Muhammed Airport\n"
                          f"   • Book Lagride to venue (45-90 min, ₦1,500-₦4,000 with code LLN2025)\n\n"
                          f"**2. Interstate Bus/Travel:**\n"
                          f"   • Arrive at Lagos terminals (Jibowu, Oshodi, etc.)\n"
                          f"   • Book Lagride to venue or Sandfield Bus Stop (30-60 min, ₦1,000-₦3,000)\n\n"
                          f"**3. Personal Car:**\n"
                          f"   • Use Google Maps to navigate to '{venue['address']}'\n"
                          f"   • Parking available (₦1,000-₦2,000/day)\n\n"
                          f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                          f"• {transport['lagride_info']}\n"
                          f"• Download app and use code **LLN2025** for 50% discount\n\n"
                          f"**💡 Tips for Out-of-Town Attendees:**\n"
                          f"• **Book Early:** Reserve flights/buses well in advance\n"
                          f"• **Accommodation:** Stay in Victoria Island/Ikoyi for proximity (15-30 min via Lagride)\n"
                          f"• **Traffic Planning:** Leave 1-2 hours early for morning travel\n"
                          f"• **Pre-book Rides:** Book Lagride 30 minutes before you need it\n"
                          f"• **Landmark Navigation:** Tell drivers \"Sandfield Bus Stop, Oriental Hotel area\"\n\n"
                          f"**🚌 Public Transport Option:**\n"
                          f"• {transport['public_transport']}\n\n"
                          f"**📞 Website:** {LLN_KNOWLEDGE['contact_info']['website']}\n\n"
                          f"*Use Google Maps for turn-by-turn navigation and Lagride with code LLN2025 for discounted travel!*"
            }
    
    except Exception as e:
        # Fallback with address-based link
        venue = LLN_KNOWLEDGE["venue"]
        transport = LLN_KNOWLEDGE["transportation"]
        bus_stop = LLN_KNOWLEDGE["bus_stops"]["sandfield"]
        
        encoded_venue_address = urllib.parse.quote(venue['address'])
        venue_maps_link = f"https://www.google.com/maps/dir/?api=1&destination={encoded_venue_address}&travelmode=driving"
        bus_stop_maps_link = f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote('Sandfield Bus Stop, near Oriental Hotel, Victoria Island, Lagos')}"
        
        return {
            "message": f"**Directions to LinkedIn Local Nigeria Venue:**\n\n"
                      f"📍 **Destination:** {venue['name']}, {venue['address']}\n\n"
                      f"🗺️ **Google Maps Navigation:**\n"
                      f"[Get Directions to Trinity Towers]({venue_maps_link})\n\n"
                      f"**🚏 Nearest Bus Stop:**\n"
                      f"• **{bus_stop['name']}** - {bus_stop['distance_to_venue']}\n"
                      f"• Near: {', '.join(bus_stop['landmarks'])}\n"
                      f"• [View Bus Stop Location]({bus_stop_maps_link})\n\n"
                      f"**🚗 Official Mobility Sponsor - Lagride:**\n"
                      f"• {transport['lagride_info']}\n"
                      f"• Download the Lagride app and use code **LLN2025** for 50% discount\n\n"
                      f"**💡 Navigation Tips:**\n"
                      f"• Enter '{venue['address']}' in Lagride app or Google Maps\n"
                      f"• Tell drivers \"Sandfield Bus Stop area\" or \"near Oriental Hotel\"\n"
                      f"• From Sandfield, it's a short ride/walk to Trinity Towers\n\n"
                      f"**📞 Website:** {LLN_KNOWLEDGE['contact_info']['website']}\n\n"
                      f"*Safe journey to the event!*"
        }

# Register the tool
custom_directions_tool = FunctionTool(get_custom_directions)