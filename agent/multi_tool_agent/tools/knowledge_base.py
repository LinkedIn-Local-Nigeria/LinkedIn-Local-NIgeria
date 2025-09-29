from typing import Dict, List
from google.adk.tools import FunctionTool, ToolContext
import re
import random

# Updated LinkedIn Local Nigeria Knowledge Base
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
        "facilities": {
            "wifi": "Free high-speed WiFi available",
            "charging": "Phone charging stations available",
            "restrooms": "Multiple restroom facilities",
            "food_court": "On-site food vendors and exhibitors for purchasing food and refreshments",
            "photo_booth": "Professional photo booth for headshots",
            "registration_desk": "Multiple registration desks for quick check-in"
        }
    },
    "event_details": {
        "name": "LinkedIn Local Nigeria",
        "date": "October 4, 2025",
        "time": "8:00 AM - 4:30 PM",
        "type": "Professional networking and learning event",
        "theme": "Building connections, sharing knowledge, empowering professionals",
        "registration": "Required - visit linkedinlocalnigeria.com",
        "dress_code": "Dress how you want to be perceived",
        "capacity": "5,000 attendees",
        "check_in_time": "7:30 AM - 8:30 AM",
        "late_arrivals": "Late check-in available until 10:00 AM",
        "giveaways": "Exciting giveaways including laptops, merchandise, internships, and a plot of land! Stay attentive during the event for details on how to participate and win."
    },
    "agenda": {
        # Placeholder: Update with schedule.csv content when provided
        "8:00_8:30": "Registration & Welcome",
        "8:30_9:00": "Opening Ceremony",
        "9:00_10:00": "Keynote Session",
        "10:00_10:15": "Break",
        "10:15_11:15": "Panel Discussion",
        "11:15_12:00": "Workshop",
        "12:00_1:00": "Lunch & Networking",
        "1:00_2:00": "Keynote Session",
        "2:00_2:45": "Pitch Competition",
        "2:45_3:00": "Break",
        "3:00_3:45": "Panel Discussion",
        "3:45_4:15": "Awards Ceremony",
        "4:15_4:30": "Closing Remarks"
    },
    "speakers": {
        "keynote_speakers": [
            "Leading CEOs from Nigerian tech ecosystem",
            "International business leaders",
            "LinkedIn influencers with 100K+ followers"
        ],
        "panelists": [
            "HR Directors from top companies",
            "Successful entrepreneurs",
            "Career coaches and mentors",
            "Industry thought leaders"
        ],
        "workshop_facilitators": [
            "LinkedIn certified trainers",
            "Digital marketing experts",
            "Personal branding specialists"
        ]
    },
    "networking_guide": {
        "before_event": {
            "profile_optimization": [
                "Update your LinkedIn profile with professional headshot",
                "Craft a compelling headline that shows your value",
                "Write a summary that tells your story",
                "Add relevant skills and get endorsements",
                "Request recommendations from colleagues"
            ],
            "goal_setting": [
                "Set specific networking goals (e.g., meet 10 new people)",
                "Identify types of people you want to connect with",
                "Prepare your elevator pitch (30-60 seconds)",
                "Research speakers and attendees beforehand",
                "Prepare thoughtful questions to ask"
            ],
            "materials_prep": [
                "Print business cards if you have them",
                "Prepare digital business card (LinkedIn QR code)",
                "Download LinkedIn mobile app",
                "Charge your phone fully",
                "Bring a portable charger"
            ]
        },
        "during_event": {
            "networking_strategies": [
                "Arrive early to meet people during registration",
                "Sit with strangers during lunch, not colleagues",
                "Ask open-ended questions to start conversations",
                "Listen more than you speak",
                "Exchange LinkedIn connections, not just business cards",
                "Take notes about people you meet",
                "Attend networking breaks - don't skip them",
                "Volunteer to help - it's a conversation starter"
            ],
            "conversation_starters": [
                "'What brought you to LinkedIn Local today?'",
                "'What's the most interesting project you're working on?'",
                "'How are you leveraging LinkedIn for your business?'",
                "'What industry trends are you most excited about?'",
                "'What's one thing you hope to learn today?'"
            ],
            "follow_up_prep": [
                "Take a photo with new connections",
                "Write quick notes about your conversation",
                "Connect on LinkedIn before leaving the event",
                "Set reminders to follow up within 24-48 hours"
            ]
        },
        "after_event": {
            "immediate_followup": [
                "Send personalized LinkedIn connection requests within 24 hours",
                "Reference your conversation in the connection message",
                "Share event photos and tag new connections",
                "Post about your event experience on LinkedIn"
            ],
            "building_relationships": [
                "Schedule coffee meetings with promising connections",
                "Share relevant articles or opportunities with new contacts",
                "Introduce connections to each other when appropriate",
                "Join LinkedIn groups that your new connections are in",
                "Engage with their LinkedIn content regularly"
            ]
        }
    },
    "maximize_experience": {
        "preparation_tips": [
            "Download the event app if available",
            "Review the agenda and prioritize must-attend sessions",
            "Research speakers and prepare questions",
            "Set learning objectives for each session",
            "Plan your networking strategy",
            "Prepare your elevator pitch",
            "Bring notebook and pen for taking notes",
            "Charge all devices and bring power bank"
        ],
        "during_event_tips": [
            "Take comprehensive notes during sessions",
            "Participate actively in Q&A sessions",
            "Use event hashtags on social media",
            "Take photos (where permitted) for content creation",
            "Exchange contacts during networking breaks",
            "Visit sponsor booths for additional learning",
            "Attend the full event - don't leave early",
            "Stay hydrated and eat well to maintain energy"
        ],
        "content_creation": [
            "Live-tweet key insights with event hashtags",
            "Share Instagram stories from sessions",
            "Write LinkedIn posts about key takeaways",
            "Create video content with permission",
            "Take notes for future blog posts or articles",
            "Share quotes from speakers (with attribution)"
        ],
        "learning_optimization": [
            "Focus on 3-5 key takeaways per session",
            "Connect new information to your current work",
            "Ask clarifying questions during sessions",
            "Network with people who complement your skills",
            "Seek mentors and potential mentees",
            "Look for collaboration opportunities"
        ]
    },
    "tickets": {
        "student": {
            "price": "₦6,497 (late bird)",
            "target": "Students and NYSC members",
            "description": "Perfect for students and NYSC members who are no longer waiting for 'after school' to start building impact, influence, and income",
            "perks": [
                "Access to all events: keynote sessions, panels",
                "Access to event materials and resources", 
                "Digital certificate of participation",
                "General seating",
                "Student networking zone access",
                "Career guidance session"
            ]
        },
        "freelance": {
            "price": "₦12,497 (late bird)",
            "target": "Freelancers, solopreneurs, creatives, consultants",
            "description": "For freelancers, designers, writers, developers, social media managers, creatives and consultants who work project-to-project",
            "perks": [
                "Certificate of attendance",
                "Priority seating",
                "Access to digital resources and event materials",
                "Networking opportunities with founders, business leaders, and investors",
                "Full access to keynote sessions, panel discussions, pitches, exhibitions, and award session",
                "Freelancer meetup session",
                "Business development workshop access"
            ]
        },
        "premium": {
            "price": "₦25,497 (late bird)",
            "target": "Working-class professionals, early-stage founders, career shifters, personal brand builders",
            "description": "For working-class professionals, early-stage founders, career shifters or transitioners, personal brand builders, people who are serious about growth and visibility",
            "perks": [
                "All freelance benefits",
                "Red carpet interview opportunity",
                "Professional headshot at the event",
                "Fast-track registration & entry", 
                "Reserved seating near front rows",
                "Access to premium networking lounge",
                "One-on-one session with career coach",
                "LinkedIn profile review session"
            ]
        },
        "vip": {
            "price": "₦52,997",
            "target": "Experienced professionals, team leads, mid-level managers, established founders",
            "description": "For experienced professionals, team leads, mid-level managers, or industry mentors, established founders and business owners, business leaders looking for higher-level engagement",
            "perks": [
                "All premium benefits",
                "Premium digital and physical media coverage (photo/video kit)",
                "VIP front row reserved seating",
                "Deeper access to insider conversations with high-level speakers",
                "Premium VIP networking lounge with curated refreshments",
                "Customized name tag with 'VIP' badge or gold lanyard",
                "VIP-only mastermind session",
                "Priority access to speakers for Q&A",
                "Executive networking dinner invitation"
            ]
        },
        "vvip": {
            "price": "₦106,557",
            "target": "Senior executives, top founders, high-impact leaders, investors",
            "description": "For senior executives, top founders, and high-impact leaders, investors, community builders, sponsors, and ecosystem drivers who want visibility, legacy, and exclusivity",
            "perks": [
                "All VIP benefits",
                "Front-row seating at the event for optimal experience during sessions and panels",
                "Access to exclusive private meeting with the event's speakers",
                "Personal networking opportunities and one-on-one conversations",
                "Dedicated VVIP check-in desk with no queues and personalized welcome experience",
                "VIP-only gift bag (luxury items, branded merch, notebooks, accessories, etc.)",
                "Customized name tag with 'VVIP' badge or gold lanyard",
                "Private VVIP lounge with premium catering",
                "Personal concierge service during event",
                "Exclusive roundtable discussion with C-suite executives",
                "Speaking opportunity consideration for future events"
            ]
        },
        "virtual": {
            "price": "₦6,997",
            "target": "Remote attendees",
            "description": "For everyone who would love to join us online",
            "perks": [
                "Online access to all sessions",
                "Digital event materials",
                "Virtual networking opportunities",
                "Access to recorded sessions for 30 days",
                "Virtual networking rooms",
                "Digital certificate of participation",
                "Online chat access during sessions"
            ]
        }
    },
    "transportation": {
        "Lagride (Official Mobility Sponsor)_discount": "50% off with coupon code: LLN2025",
        "Lagride (Official Mobility Sponsor)_info": "Book your ride using Lagride (Official Mobility Sponsor) app with code LLN2025 for 50% discount",
        "uber_bolt": "Available - search 'Trinity Towers, Chief Yesufu Abiodun Oniru Road'",
        "public_transport": "BRT to CMS, then taxi/ride-share to Oniru area",
        "from_airport": "45-90 minutes from Murtala Muhammed Airport depending on traffic",
        "from_mainland": "30-60 minutes via Third Mainland Bridge or Carter Bridge", 
        "from_island": "15-30 minutes within Victoria Island/Ikoyi area",
        "parking": "Available nearby",
        "ride_sharing": "Coordinate rides with other attendees via WhatsApp groups",
        "early_transport": "Book rides 30 minutes earlier during rush hours",
        "return_transport": "Book return rides before 4:00 PM to avoid delays"
    },
    "food_and_refreshments": {
        "included_meals": {
            "vip_vvip_only": "VIP and VVIP tickets include curated refreshments and premium catering in exclusive lounges",
            "others": "No complimentary meals for Student, Freelance, Premium, or Virtual tickets"
        },
        "vendors_exhibitors": [
            "On-site food vendors and exhibitors available for purchasing meals and snacks",
            "Variety of Nigerian and continental food options",
            "Beverage stations for purchasing drinks"
        ],
        "dietary_requirements": [
            "Vegetarian and Halal options available from vendors",
            "Notify organizers of special dietary needs during registration for VIP/VVIP catering",
            "Water stations available throughout the venue"
        ],
        "nearby_restaurants": [
            "Multiple restaurants within 5 minutes walk",
            "Food courts in nearby shopping centers",
            "Local vendors outside the venue"
        ]
    },
    "what_to_bring": {
        "essentials": [
            "Government-issued ID for registration",
            "Phone with LinkedIn app installed",
            "Portable charger/power bank",
            "Business cards (if available)",
            "Notebook and pen",
            "Comfortable walking shoes",
            "Cash or mobile payment for food and vendor purchases"
        ],
        "optional": [
            "Tablet for note-taking",
            "Small bag for event materials",
            "Umbrella (weather dependent)",
            "Hand sanitizer",
            "Water bottle"
        ],
        "professional_items": [
            "Updated resume (digital copies)",
            "Portfolio samples (for creatives)",
            "LinkedIn QR code screenshot",
            "Company brochures (for business owners)"
        ]
    },
    "faqs": {
        "registration": {
            "can_i_pay_at_venue": "No, pre-registration online is mandatory. No on-site payments accepted.",
            "ticket_transfer": "Tickets can be transferred to another person by contacting organizers 48 hours before event.",
            "refund_policy": "Refunds available up to 7 days before event. Processing fee may apply.",
            "group_discounts": "Contact organizers for group discounts (10+ people)",
            "student_verification": "Student ID required for student ticket verification"
        },
        "event_day": {
            "what_if_late": "Late arrivals accepted until 10:00 AM with valid ticket",
            "dress_code_strict": "Smart casual to business formal. Dress to reflect your professional goals",
            "photography": "Photography allowed in designated areas. Speakers may request no photos",
            "networking": "Dedicated networking breaks and lunch specifically for meeting new people",
            "certificates": "Digital certificates available 48 hours after event",
            "giveaways": "Exciting giveaways (laptops, merchandise, internships, plot of land) will be announced during the event. Stay attentive for participation details!"
        },
        "technical": {
            "wifi_password": "Will be shared during event registration",
            "live_streaming": "Selected sessions will be live-streamed for virtual attendees",
            "recording": "Sessions recorded for educational purposes with speaker consent",
            "app_download": "Event app details shared via email before event date"
        }
    },
    "safety_guidelines": {
        "health_protocols": [
            "Hand sanitizer stations available throughout venue",
            "Masks recommended but not mandatory",
            "Stay home if feeling unwell",
            "Maintain respectful personal space during networking"
        ],
        "security": [
            "Security personnel present throughout event",
            "Lost and found desk at registration area",
            "Emergency contact numbers provided at registration",
            "Bag checks may be conducted at entry"
        ]
    },
    "about_lln": {
        "mission": "Building Nigeria's largest professional community through LinkedIn Local chapters",
        "vision": "Connecting professionals, sharing knowledge, and empowering career growth",
        "founded": "Part of the global LinkedIn Local movement",
        "focus": "Professional development, networking, business growth, and community building",
        "target_audience": "Professionals, entrepreneurs, business leaders, and career-minded individuals",
        "past_events": "Successfully hosted 15+ events with 20,000+ total attendees",
        "community_size": "Over 50,000 members across Nigeria"
    },
    "contact_info": {
        "website": "https://linkedinlocalnigeria.com",
        "email": "info@linkedinlocalnigeria.com",
        "social_media": {
            "linkedin": "LinkedIn Local Nigeria",
            "twitter": "@LinkedInLocalNG",
            "instagram": "@linkedinlocalnigeria",
            "facebook": "LinkedIn Local Nigeria"
        },
        "emergency_contact": "Event day emergency: +234 XXX XXX XXXX"
    },
    "follow_up_resources": {
        "post_event": [
            "Session recordings available within 48 hours",
            "Speaker presentation slides shared via email",
            "Attendee LinkedIn group for continued networking",
            "Monthly follow-up meetups announced",
            "Resource library with templates and guides"
        ],
        "continued_learning": [
            "Monthly LinkedIn Local meetups",
            "Online masterclasses",
            "Mentorship program opportunities",
            "Industry-specific WhatsApp groups",
            "Annual conference announcements"
        ]
    }
}

def get_venue_info(query: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get comprehensive venue information and directions.
    """
    try:
        venue = LLN_KNOWLEDGE["venue"]
        transport = LLN_KNOWLEDGE["transportation"]
        
        if not query:
            facilities_list = "\n".join([f"  • {desc}" for desc in venue["facilities"].values()])
            return {
                "message": f"**Event Venue:**\n\n"
                          f"📍 **{venue['name']}**\n"
                          f"📧 {venue['address']}\n"
                          f"👥 **Capacity:** {venue['capacity']}\n\n"
                          f"**Facilities:**\n{facilities_list}\n\n"
                          f"**Getting There:**\n"
                          f"🚗 Lagride (Official Mobility Sponsor) (Official Mobility Sponsor): Search '{venue['name']}, Chief Yesufu Abiodun Oniru Road'\n"
                          f"🎉 **Special Offer:** {transport['Lagride (Official Mobility Sponsor)_info']}\n"
                          f"♿ {venue['accessibility']}\n\n"
                          f"*Need directions from your location? Just ask!*"
            }
        
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['facilities', 'amenities', 'services']):
            facilities_list = "\n".join([f"• **{key.replace('_', ' ').title()}:** {value}" 
                                       for key, value in venue["facilities"].items()])
            return {
                "message": f"**Venue Facilities & Amenities:**\n\n{facilities_list}\n\n"
                          f"*Food and refreshments available for purchase from vendors.*"
            }
        
        elif any(word in query_lower for word in ['address', 'location', 'where']):
            return {
                "message": f"**Event Location:**\n\n"
                          f"📍 **{venue['name']}**\n"
                          f"{venue['address']}\n\n"
                          f"**Landmark:** {venue['landmark']}\n"
                          f"**Contact:** {venue['contact']}"
            }
        
        else:
            return {
                "message": f"**{venue['name']} Information:**\n\n"
                          f"📧 **Address:** {venue['address']}\n"
                          f"📱 **Contact:** {venue['contact']}\n"
                          f"🚗 **Transportation:** {transport['uber_bolt']}\n"
                          f"🅿️ **Parking:** {venue['parking']}\n"
                          f"♿ **Accessibility:** {venue['accessibility']}"
            }
    
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch venue information. Error: {str(e)}"}

def get_networking_guide(section: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get comprehensive networking guidance and strategies.
    """
    try:
        networking = LLN_KNOWLEDGE["networking_guide"]
        
        if not section:
            return {
                "message": f"**Complete Networking Guide for LinkedIn Local Nigeria:**\n\n"
                          f"**📋 Available Sections:**\n"
                          f"• **Before Event** - Preparation strategies\n"
                          f"• **During Event** - Networking tactics and conversation tips\n"
                          f"• **After Event** - Follow-up and relationship building\n\n"
                          f"**Quick Tips:**\n"
                          f"• Set a goal to meet 10+ new people\n"
                          f"• Prepare your 30-second elevator pitch\n"
                          f"• Bring business cards or LinkedIn QR code\n"
                          f"• Ask open-ended questions\n"
                          f"• Follow up within 24-48 hours\n\n"
                          f"*Ask for specific sections like 'networking before event' or 'conversation starters'*"
            }
        
        section_lower = section.lower()
        
        if any(word in section_lower for word in ['before', 'preparation', 'prep']):
            before = networking["before_event"]
            profile_tips = "\n".join([f"  • {tip}" for tip in before["profile_optimization"]])
            goal_tips = "\n".join([f"  • {tip}" for tip in before["goal_setting"]])
            material_tips = "\n".join([f"  • {tip}" for tip in before["materials_prep"]])
            
            return {
                "message": f"**Networking Preparation Guide:**\n\n"
                          f"**📱 LinkedIn Profile Optimization:**\n{profile_tips}\n\n"
                          f"**🎯 Goal Setting:**\n{goal_tips}\n\n"
                          f"**🎒 Materials & Preparation:**\n{material_tips}\n\n"
                          f"*Proper preparation is 50% of networking success!*"
            }
        
        elif any(word in section_lower for word in ['during', 'strategies', 'tactics', 'conversation']):
            during = networking["during_event"]
            strategies = "\n".join([f"  • {strategy}" for strategy in during["networking_strategies"]])
            starters = "\n".join([f"  • {starter}" for starter in during["conversation_starters"]])
            
            return {
                "message": f"**During Event Networking Strategies:**\n\n"
                          f"**🤝 Networking Tactics:**\n{strategies}\n\n"
                          f"**💬 Conversation Starters:**\n{starters}\n\n"
                          f"**📝 Pro Tip:** Take quick notes about each person you meet - name, company, interesting fact. This helps with follow-up!"
            }
        
        elif any(word in section_lower for word in ['after', 'follow', 'followup', 'follow-up']):
            after = networking["after_event"]
            immediate = "\n".join([f"  • {tip}" for tip in after["immediate_followup"]])
            building = "\n".join([f"  • {tip}" for tip in after["building_relationships"]])
            
            return {
                "message": f"**Post-Event Networking & Follow-up:**\n\n"
                          f"**⚡ Immediate Follow-up (24-48 hours):**\n{immediate}\n\n"
                          f"**🌱 Building Long-term Relationships:**\n{building}\n\n"
                          f"**📈 Remember:** The real networking happens AFTER the event. Follow up promptly and consistently!"
            }
        
        else:
            return get_networking_guide("", tool_context)  # Return general guide
            
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch networking guide. Error: {str(e)}"}

def get_maximize_experience(section: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get comprehensive guide on maximizing the event experience.
    """
    try:
        maximize = LLN_KNOWLEDGE["maximize_experience"]
        
        if not section:
            return {
                "message": f"**How to Maximize Your LinkedIn Local Nigeria Experience:**\n\n"
                          f"**📚 Available Guides:**\n"
                          f"• **Preparation** - Pre-event preparation strategies\n"
                          f"• **During Event** - Active participation tips\n"
                          f"• **Content Creation** - Social media and content strategies\n"
                          f"• **Learning** - Learning optimization techniques\n\n"
                          f"**Quick Success Tips:**\n"
                          f"• Attend the full event (8:00 AM - 4:30 PM)\n"
                          f"• Take comprehensive notes\n"
                          f"• Participate in Q&A sessions\n"
                          f"• Network during breaks\n"
                          f"• Share insights on social media\n\n"
                          f"*Ask for specific sections like 'preparation tips' or 'content creation'*"
            }
        
        section_lower = section.lower()
        
        if any(word in section_lower for word in ['prep', 'preparation', 'before']):
            prep_tips = "\n".join([f"  • {tip}" for tip in maximize["preparation_tips"]])
            return {
                "message": f"**Pre-Event Preparation for Maximum Impact:**\n\n{prep_tips}\n\n"
                          f"**🎯 Success Metric:** Come prepared with specific learning goals and networking targets!"
            }
        
        elif any(word in section_lower for word in ['during', 'participation', 'active']):
            during_tips = "\n".join([f"  • {tip}" for tip in maximize["during_event_tips"]])
            return {
                "message": f"**During Event: Active Participation Strategies:**\n\n{during_tips}\n\n"
                          f"**⚡ Energy Tip:** Stay hydrated and purchase food from vendors to maintain high energy throughout the day!"
            }
        
        elif any(word in section_lower for word in ['content', 'social', 'media', 'sharing']):
            content_tips = "\n".join([f"  • {tip}" for tip in maximize["content_creation"]])
            return {
                "message": f"**Content Creation & Social Media Strategy:**\n\n{content_tips}\n\n"
                          f"**📱 Hashtags to Use:** #LinkedInLocalNigeria #LLN2025 #Networking #ProfessionalDevelopment\n\n"
                          f"**📸 Content Ideas:**\n"
                          f"  • Key quotes from speakers\n"
                          f"  • Your main takeaways\n"
                          f"  • Photos with new connections\n"
                          f"  • Behind-the-scenes moments"
            }
        
        elif any(word in section_lower for word in ['learning', 'education', 'knowledge']):
            learning_tips = "\n".join([f"  • {tip}" for tip in maximize["learning_optimization"]])
            return {
                "message": f"**Learning Optimization Strategies:**\n\n{learning_tips}\n\n"
                          f"**🧠 Learning Framework:**\n"
                          f"  1. **Listen** actively during sessions\n"
                          f"  2. **Connect** new ideas to your experience\n"
                          f"  3. **Apply** insights immediately where possible\n"
                          f"  4. **Share** learnings to reinforce understanding"
            }
        
        else:
            return get_maximize_experience("", tool_context)
            
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch experience guide. Error: {str(e)}"}

def get_event_agenda(time_slot: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get detailed event agenda and session information.
    """
    try:
        agenda = LLN_KNOWLEDGE["agenda"]
        speakers = LLN_KNOWLEDGE["speakers"]
        
        if not time_slot:
            agenda_text = "\n".join([f"**{time.replace('_', ':')}** - {session}" 
                                   for time, session in agenda.items()])
            return {
                "message": f"**LinkedIn Local Nigeria Event Agenda (Tentative):**\n"
                          f"📅 **October 4, 2025**\n\n{agenda_text}\n\n"
                          f"**🎤 Featured Speakers Include:**\n"
                          f"• {', '.join(speakers['keynote_speakers'])}\n"
                          f"• {', '.join(speakers['panelists'][:2])}\n\n"
                          f"*Note: Agenda subject to change based on final schedule. Ask about specific time slots for details!*"
            }
        
        time_key = time_slot.replace(":", "_").replace(" ", "_")
        if time_key in agenda:
            return {
                "message": f"**{time_slot.replace('_', ':')} Session:**\n\n"
                          f"📋 **{agenda[time_key]}**\n\n"
                          f"*This is a key session - don't miss it!*"
            }
        else:
            return {
                "message": f"Time slot '{time_slot}' not found. Available times: {', '.join([t.replace('_', ':') for t in agenda.keys()])}"
            }
            
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch agenda. Error: {str(e)}"}

def get_practical_info(topic: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get practical information about food, what to bring, safety, etc.
    """
    try:
        if not topic:
            return {
                "message": f"**Practical Information Available:**\n\n"
                          f"• **Food & Refreshments** - Vendor options, VIP/VVIP catering\n"
                          f"• **What to Bring** - Essential and optional items\n"
                          f"• **Safety Guidelines** - Health and security protocols\n"
                          f"• **FAQs** - Common questions and answers\n\n"
                          f"*Ask about any specific topic like 'food', 'what to bring', or 'safety'*"
            }
        
        topic_lower = topic.lower()
        
        if any(word in topic_lower for word in ['food', 'meal', 'eat', 'lunch', 'refreshment']):
            food = LLN_KNOWLEDGE["food_and_refreshments"]
            meals = "\n".join([f"• **{meal.title()}:** {desc}" 
                             for meal, desc in food["included_meals"].items()])
            vendors = "\n".join([f"  • {req}" for req in food["vendors_exhibitors"]])
            dietary = "\n".join([f"  • {req}" for req in food["dietary_requirements"]])
            restaurants = "\n".join([f"  • {rest}" for rest in food["nearby_restaurants"]])
            
            return {
                "message": f"**Food & Refreshments:**\n\n"
                          f"**🍽️ Included Meals:**\n{meals}\n\n"
                          f"**🥪 Vendor Options:**\n{vendors}\n\n"
                          f"**🥗 Dietary Requirements:**\n{dietary}\n\n"
                          f"**🍕 Nearby Options:**\n{restaurants}\n\n"
                          f"*Bring cash or mobile payment for vendor purchases!*"
            }
        
        elif any(word in topic_lower for word in ['bring', 'pack', 'items', 'essentials']):
            bring = LLN_KNOWLEDGE["what_to_bring"]
            essentials = "\n".join([f"  • {item}" for item in bring["essentials"]])
            optional = "\n".join([f"  • {item}" for item in bring["optional"]])
            professional = "\n".join([f"  • {item}" for item in bring["professional_items"]])
            
            return {
                "message": f"**What to Bring to the Event:**\n\n"
                          f"**✅ Essential Items:**\n{essentials}\n\n"
                          f"**📱 Optional (Recommended):**\n{optional}\n\n"
                          f"**💼 Professional Items:**\n{professional}\n\n"
                          f"*Pack light but be prepared for a full day of networking and learning!*"
            }
        
        elif any(word in topic_lower for word in ['safety', 'security', 'health', 'protocol']):
            safety = LLN_KNOWLEDGE["safety_guidelines"]
            health = "\n".join([f"  • {protocol}" for protocol in safety["health_protocols"]])
            security = "\n".join([f"  • {measure}" for measure in safety["security"]])
            
            return {
                "message": f"**Safety Guidelines & Protocols:**\n\n"
                          f"**🏥 Health Protocols:**\n{health}\n\n"
                          f"**🛡️ Security Measures:**\n{security}\n\n"
                          f"*Your safety and comfort are our top priorities!*"
            }
        
        elif any(word in topic_lower for word in ['faq', 'questions', 'common', 'answers']):
            faqs = LLN_KNOWLEDGE["faqs"]
            return {
                "message": f"**Frequently Asked Questions:**\n\n"
                          f"**📝 Registration FAQs:**\n"
                          f"• Can I pay at venue? {faqs['registration']['can_i_pay_at_venue']}\n"
                          f"• Refund policy? {faqs['registration']['refund_policy']}\n"
                          f"• Group discounts? {faqs['registration']['group_discounts']}\n\n"
                          f"**📅 Event Day FAQs:**\n"
                          f"• What if I'm late? {faqs['event_day']['what_if_late']}\n"
                          f"• Strict dress code? {faqs['event_day']['dress_code_strict']}\n"
                          f"• Photography allowed? {faqs['event_day']['photography']}\n"
                          f"• Giveaways? {faqs['event_day']['giveaways']}\n\n"
                          f"*Have more questions? Contact us at info@linkedinlocalnigeria.com*"
            }
        
        else:
            return get_practical_info("", tool_context)
            
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch practical information. Error: {str(e)}"}

def get_event_info(query: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get enhanced general event information about LinkedIn Local Nigeria.
    """
    try:
        event = LLN_KNOWLEDGE["event_details"]
        about = LLN_KNOWLEDGE["about_lln"]
        contact = LLN_KNOWLEDGE["contact_info"]
        venue = LLN_KNOWLEDGE["venue"]
        
        if not query:
            return {
                "message": f"**LinkedIn Local Nigeria Event:**\n\n"
                          f"📅 **Date:** {event['date']}\n"
                          f"⏰ **Time:** {event['time']}\n"
                          f"📍 **Venue:** {venue['name']}, Chief Yesufu Abiodun Oniru Road\n"
                          f"👥 **Expected Attendees:** {event['capacity']}\n"
                          f"👔 **Dress Code:** {event['dress_code']}\n"
                          f"🎁 **Giveaways:** {event['giveaways']}\n\n"
                          f"**🎯 Mission:** {about['mission']}\n\n"
                          f"**✅ Registration:** {event['registration']}\n"
                          f"🌐 **Website:** {contact['website']}\n\n"
                          f"**🏆 Community Stats:**\n"
                          f"• {about['past_events']}\n"
                          f"• {about['community_size']}"
            }
        
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['about', 'what is', 'mission', 'purpose']):
            return {
                "message": f"**About LinkedIn Local Nigeria:**\n\n"
                          f"🎯 **Mission:** {about['mission']}\n\n"
                          f"🔮 **Vision:** {about['vision']}\n\n"
                          f"🎪 **Focus Areas:** {about['focus']}\n\n"
                          f"👥 **Target Audience:** {about['target_audience']}\n\n"
                          f"🌐 **Global Connection:** {about['founded']}\n\n"
                          f"**📊 Our Impact:**\n"
                          f"• {about['past_events']}\n"
                          f"• {about['community_size']}"
            }
        
        elif any(word in query_lower for word in ['check-in', 'checkin', 'arrival', 'late']):
            return {
                "message": f"**Check-in Information:**\n\n"
                          f"⏰ **Regular Check-in:** {event['check_in_time']}\n"
                          f"🕙 **Late Arrivals:** {event['late_arrivals']}\n\n"
                          f"**📋 What You Need:**\n"
                          f"  • Government-issued ID\n"
                          f"  • Ticket confirmation (digital or printed)\n"
                          f"  • Student ID (for student tickets)\n\n"
                          f"**⚡ Pro Tip:** Arrive early to avoid queues and start networking during registration!"
            }
        
        elif any(word in query_lower for word in ['giveaway', 'giveaways', 'prizes']):
            return {
                "message": f"**Exciting Giveaways at LinkedIn Local Nigeria:**\n\n"
                          f"🎁 **Giveaways:** {event['giveaways']}\n\n"
                          f"**📢 How to Participate:**\n"
                          f"  • Stay attentive during the event for announcements\n"
                          f"  • Follow instructions provided by organizers\n"
                          f"  • Engage actively in sessions and networking\n\n"
                          f"*Don’t miss your chance to win laptops, merchandise, internships, or even a plot of land!*"
            }
        
        elif any(word in query_lower for word in ['date', 'when', 'time']):
            return {
                "message": f"**Event Date & Time:**\n\n"
                          f"📅 **Date:** {event['date']}\n"
                          f"⏰ **Time:** {event['time']}\n"
                          f"🚪 **Check-in:** {event['check_in_time']}\n"
                          f"📍 **Venue:** {venue['name']}, Chief Yesufu Abiodun Oniru Road\n"
                          f"🎁 **Giveaways:** {event['giveaways']}\n\n"
                          f"*Mark your calendar and join us for a full day of networking and learning!*"
            }
        
        else:
            return get_event_info("", tool_context)  # Return general info
            
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch event information. Error: {str(e)}"}

def get_ticket_info(ticket_type: str = "", tool_context: ToolContext = None) -> dict:
    """
    Get enhanced ticket information and pricing.
    """
    try:
        tickets = LLN_KNOWLEDGE["tickets"]
        transport = LLN_KNOWLEDGE["transportation"]
        
        if not ticket_type:
            ticket_list = []
            for key, ticket in tickets.items():
                ticket_list.append(f"• **{key.upper()} TICKET** - {ticket['price']}\n  Perfect for: {ticket['target']}")
            
            return {
                "message": f"**LinkedIn Local Nigeria Ticket Options:**\n\n" +
                          "\n\n".join(ticket_list) + 
                          f"\n\n**🎉 Special Transport Offer:**\n{transport['Lagride (Official Mobility Sponsor)_info']}\n\n" +
                          f"**💡 Choosing Your Ticket:**\n" +
                          f"• Students/NYSC → Student Ticket\n" +
                          f"• Freelancers/Creatives → Freelance Ticket\n" +
                          f"• Working Professionals → Premium Ticket\n" +
                          f"• Senior Leaders → VIP/VVIP Ticket\n\n" +
                          "*Ask about any specific ticket type for detailed perks and benefits!*"
            }
        
        ticket_lower = ticket_type.lower().strip()
        
        if ticket_lower in tickets:
            ticket = tickets[ticket_lower]
            perks_text = "\n".join([f"    • {perk}" for perk in ticket["perks"]])
            
            value_prop = ""
            if ticket_lower == "student":
                value_prop = "\n**🎓 Why Students Choose This:**\nStart building your professional network before graduation. This investment in yourself will pay dividends throughout your career!"
            elif ticket_lower == "vip":
                value_prop = "\n**💼 Executive Value:**\nAccess decision-makers, skip the crowds, and enjoy curated refreshments in the VIP lounge."
            elif ticket_lower == "vvip":
                value_prop = "\n**👑 Ultimate Experience:**\nMaximize your time with exclusive access, premium catering, and direct connections with speakers and industry leaders."
            
            return {
                "message": f"**{ticket_lower.upper()} TICKET - {ticket['price']}**\n\n"
                          f"**🎯 Perfect for:** {ticket['target']}\n\n"
                          f"**📝 Description:** {ticket['description']}\n\n"
                          f"**✨ Perks & Benefits:**\n{perks_text}\n\n"
                          f"**🚗 Special Transport Offer:**\n{transport['Lagride (Official Mobility Sponsor)_info']}\n\n"
                          f"**✅ Register:** linkedinlocalnigeria.com"
                          f"{value_prop}"
            }
        else:
            matching_tickets = [name for name in tickets.keys() if ticket_lower in name.lower()]
            if matching_tickets:
                return get_ticket_info(matching_tickets[0], tool_context)
            
            available_tickets = list(tickets.keys())
            return {
                "message": f"Ticket type '{ticket_type}' not found. Available tickets: {', '.join(available_tickets)}\n\nTry asking about 'student', 'freelance', 'premium', 'vip', or 'vvip' tickets."
            }
    
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch ticket information. Error: {str(e)}"}

def get_directions_from_location(from_location: str, tool_context: ToolContext) -> dict:
    """
    Get enhanced directions to the venue from a specific location.
    """
    try:
        venue = LLN_KNOWLEDGE["venue"]
        transport = LLN_KNOWLEDGE["transportation"]
        
        if not from_location or from_location.strip() == "":
            return {"message": "Please specify your starting location (e.g., 'Lagos Airport', 'Ikeja', 'Lekki', 'Surulere')"}
        
        location_lower = from_location.lower()
        
        if any(word in location_lower for word in ['airport', 'murtala', 'muhammed']):
            return {
                "message": f"**From Lagos Airport to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, Chief Yesufu Abiodun Oniru Road\n\n"
                          f"🕐 **Travel Time:** {transport['from_airport']}\n\n"
                          f"**🚗 Recommended Routes:**\n"
                          f"1. **Lagride (Official Mobility Sponsor) (Official Mobility Sponsor):** Search '{venue['name']}, Chief Yesufu Abiodun Oniru Road'\n"
                          f"2. **Lagride (Official Mobility Sponsor) Special:** Use code LLN2025 for 50% off\n"
                          f"3. Route: Airport Road → Third Mainland Bridge → Oniru area\n\n"
                          f"**💰 Cost Estimates:**\n"
                          f"• Regular rides: ₦3,000 - ₦8,000\n"
                          f"• With Lagride (Official Mobility Sponsor) discount: ₦1,500 - ₦4,000\n\n"
                          f"**⚠️ Traffic Tips:**\n"
                          f"• Leave 2 hours early during rush hours (7-10 AM)\n"
                          f"• Book rides 30 minutes in advance\n"
                          f"• Consider staying overnight near venue if arriving late"
            }
        
        elif any(word in location_lower for word in ['mainland', 'ikeja', 'surulere', 'yaba', 'mushin', 'maryland', 'gbagada']):
            return {
                "message": f"**From Lagos Mainland to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, Chief Yesufu Abiodun Oniru Road\n\n"
                          f"🕐 **Travel Time:** {transport['from_mainland']}\n\n"
                          f"**🚗 Transportation Options:**\n"
                          f"1. **Lagride (Official Mobility Sponsor) (Official Mobility Sponsor):** Search '{venue['name']}, Chief Yesufu Abiodun Oniru Road'\n"
                          f"2. **Lagride (Official Mobility Sponsor) (50% off):** Use code LLN2025\n"
                          f"3. **BRT + Taxi:** BRT to CMS → Taxi to Oniru (₦1,500 total)\n"
                          f"4. **Personal Car:** Third Mainland/Carter Bridge → Oniru\n\n"
                          f"**💰 Cost Breakdown:**\n"
                          f"• Lagride (Official Mobility Sponsor) (Official Mobility Sponsor): ₦2,000 - ₦6,000\n"
                          f"• Lagride (Official Mobility Sponsor) discounted: ₦1,000 - ₦3,000\n"
                          f"• BRT + Taxi: ₦1,500 total\n\n"
                          f"**📍 Parking:** Available near venue (₦1,000-₦2,000/day)\n"
                          f"**⏰ Best departure times:** 6:30-7:00 AM to arrive by 8:00 AM"
            }
        
        elif any(word in location_lower for word in ['island', 'ikoyi', 'lekki', 'ajah', 'vi', 'victoria island']):
            return {
                "message": f"**From Lagos Island to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}, Chief Yesufu Abiodun Oniru Road\n\n"
                          f"🕐 **Travel Time:** {transport['from_island']}\n\n"
                          f"**🚗 Easy Transportation:**\n"
                          f"1. **Lagride (Official Mobility Sponsor) (Official Mobility Sponsor):** Search '{venue['name']}, Chief Yesufu Abiodun Oniru Road'\n"
                          f"2. **Lagride (Official Mobility Sponsor) (50% off):** Use code LLN2025\n"
                          f"3. **Taxi:** Direct route within VI area\n"
                          f"4. **Walk + Uber:** If staying very close in VI\n\n"
                          f"**💰 Cost (Very Affordable):**\n"
                          f"• Lagride (Official Mobility Sponsor) (Official Mobility Sponsor): ₦1,000 - ₦3,000\n"
                          f"• Lagride (Official Mobility Sponsor) discounted: ₦500 - ₦1,500\n"
                          f"• Taxi: ₦1,500 - ₦2,500\n\n"
                          f"**✅ Advantages:**\n"
                          f"• Shortest distance - you're already on the Island!\n"
                          f"• Less traffic compared to mainland routes\n"
                          f"• Multiple transportation options\n"
                          f"• Easy return journey after event"
            }
        
        else:
            return {
                "message": f"**From {from_location} to Event Venue:**\n\n"
                          f"📍 **Destination:** {venue['name']}\n"
                          f"📧 {venue['address']}\n\n"
                          f"**🚗 General Directions:**\n"
                          f"1. Open your preferred ride app (Lagride (Official Mobility Sponsor) (Official Mobility Sponsor)/Lagride (Official Mobility Sponsor))\n"
                          f"2. Search '{venue['name']}, Chief Yesufu Abiodun Oniru Road'\n"
                          f"3. Book your ride\n\n"
                          f"**💰 Special Offers:**\n"
                          f"• {transport['Lagride (Official Mobility Sponsor)_info']}\n\n"
                          f"**🗺️ Alternative Navigation:**\n"
                          f"Use Google Maps with destination:\n"
                          f"'{venue['name']}, Chief Yesufu Abiodun Oniru Road, Lagos'\n\n"
                          f"**📞 Need Help?**\n"
                          f"*For specific route guidance, please use GPS navigation from your exact location.*"
            }
    
    except Exception as e:
        return {"message": f"Sorry, couldn't provide directions from '{from_location}'. Error: {str(e)}"}

def get_follow_up_resources(tool_context: ToolContext = None) -> dict:
    """
    Get information about post-event resources and continued engagement.
    """
    try:
        resources = LLN_KNOWLEDGE["follow_up_resources"]
        post_event = "\n".join([f"  • {resource}" for resource in resources["post_event"]])
        learning = "\n".join([f"  • {resource}" for resource in resources["continued_learning"]])
        
        return {
            "message": f"**Post-Event Resources & Continued Engagement:**\n\n"
                      f"**📚 What You'll Get After the Event:**\n{post_event}\n\n"
                      f"**📈 Continued Learning Opportunities:**\n{learning}\n\n"
                      f"**🤝 Stay Connected:**\n"
                      f"• Join our LinkedIn group for ongoing discussions\n"
                      f"• Follow us on social media for updates\n"
                      f"• Attend monthly local meetups\n"
                      f"• Participate in our mentorship programs\n\n"
                      f"*The event is just the beginning of your LinkedIn Local Nigeria journey!*"
        }
        
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch follow-up resources. Error: {str(e)}"}

def handle_general_query(query: str, tool_context: ToolContext) -> dict:
    """
    Handle general queries that don't fit specific categories.
    """
    query_lower = query.lower()
    
    responses = {
        "motivation": [
            "LinkedIn Local Nigeria is your gateway to building meaningful professional relationships that can transform your career!",
            "This event brings together 5,000 ambitious professionals - imagine the opportunities waiting for you!",
            "Every successful career is built on strong networks. This is your chance to build yours!"
        ],
        "success_tips": [
            "Success at LLN comes from preparation, active participation, and consistent follow-up!",
            "The magic happens when you step out of your comfort zone and start conversations with strangers.",
            "Your next opportunity might come from someone you meet during the coffee break!"
        ],
        "value_proposition": [
            "For less than ₦30,000, you get access to Nigeria's largest professional networking event, expert speakers, and 5,000+ potential connections!",
            "This investment in yourself will pay dividends throughout your career through the relationships you build.",
            "The knowledge, connections, and opportunities from one day can change your professional trajectory!"
        ]
    }
    
    if any(word in query_lower for word in ['why', 'benefit', 'worth', 'value']):
        return {"message": random.choice(responses["value_proposition"])}
    elif any(word in query_lower for word in ['motivate', 'inspire', 'encourage']):
        return {"message": random.choice(responses["motivation"])}
    elif any(word in query_lower for word in ['success', 'win', 'best']):
        return {"message": random.choice(responses["success_tips"])}
    elif any(word in query_lower for word in ['giveaway', 'giveaways', 'prizes']):
        return {
            "message": f"**Exciting Giveaways at LinkedIn Local Nigeria:**\n\n"
                      f"🎁 **Giveaways:** {LLN_KNOWLEDGE['event_details']['giveaways']}\n\n"
                      f"**📢 How to Participate:**\n"
                      f"  • Stay attentive during the event for announcements\n"
                      f"  • Follow instructions provided by organizers\n"
                      f"  • Engage actively in sessions and networking\n\n"
                      f"*Don’t miss your chance to win laptops, merchandise, internships, or even a plot of land!*"
        }
    else:
        return {
            "message": "I'd be happy to help you with information about LinkedIn Local Nigeria! You can ask me about:\n\n"
                      "• **Venue & Directions** - Location, facilities, how to get there\n"
                      "• **Networking Guide** - Before, during, and after event strategies\n"
                      "• **Maximize Experience** - Preparation tips, learning optimization\n"
                      "• **Event Agenda** - Schedule, speakers, sessions\n"
                      "• **Tickets** - Pricing, perks, and recommendations\n"
                      "• **Practical Info** - Food, what to bring, safety guidelines\n"
                      "• **Giveaways** - Details on exciting prizes\n\n"
                      "*What would you like to know more about?*"
        }

venue_tool = FunctionTool(get_venue_info)
event_info_tool = FunctionTool(get_event_info)
directions_tool = FunctionTool(get_directions_from_location)
ticket_tool = FunctionTool(get_ticket_info)
networking_tool = FunctionTool(get_networking_guide)
maximize_tool = FunctionTool(get_maximize_experience)
agenda_tool = FunctionTool(get_event_agenda)
practical_tool = FunctionTool(get_practical_info)
resources_tool = FunctionTool(get_follow_up_resources)
general_tool = FunctionTool(handle_general_query)