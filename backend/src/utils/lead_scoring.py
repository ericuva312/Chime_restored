"""
Lead Scoring Algorithm for ROI Calculator
Scoring system: 0-150 points total
- Demographic: 40% weight (max 60 points)
- Behavioral: 35% weight (max 52 points)  
- Fit: 25% weight (max 38 points)

Tiers: ≥90 Hot; 60-89 Warm; <60 Cold
"""

def calculate_lead_score(submission_data):
    """
    Calculate lead score based on submission data
    Returns: (score, tier, breakdown)
    """
    score_breakdown = {
        'demographic': 0,
        'behavioral': 0,
        'fit': 0,
        'details': {}
    }
    
    # DEMOGRAPHIC SCORING (40% weight, max 60 points)
    demographic_score = 0
    
    # Monthly revenue tiers
    monthly_revenue = float(submission_data.get('monthly_revenue', 0))
    if monthly_revenue >= 500000:
        revenue_points = 70
    elif monthly_revenue >= 100000:
        revenue_points = 55
    elif monthly_revenue >= 50000:
        revenue_points = 40
    elif monthly_revenue >= 10000:
        revenue_points = 25
    else:
        revenue_points = 10
    
    # Cap at 60 points for demographic
    revenue_points = min(revenue_points, 60)
    demographic_score += revenue_points
    score_breakdown['details']['revenue_tier'] = revenue_points
    
    # Business stage
    business_stage = submission_data.get('business_stage', '').lower()
    stage_points = {
        'startup': 10,
        'growth': 20,
        'established': 30,
        'mature': 40
    }.get(business_stage, 0)
    
    # Total demographic (but cap at 60)
    demographic_score = min(demographic_score + stage_points, 60)
    score_breakdown['details']['business_stage'] = stage_points
    score_breakdown['demographic'] = demographic_score
    
    # BEHAVIORAL SCORING (35% weight, max 52 points)
    behavioral_score = 0
    
    # Optional fields filled (10 points each)
    optional_fields = ['website', 'phone', 'monthly_ad_spend']
    for field in optional_fields:
        if submission_data.get(field):
            behavioral_score += 10
            score_breakdown['details'][f'{field}_filled'] = 10
    
    # Detailed challenges (≥2 selections or "Other" text ≥50 chars)
    challenges = submission_data.get('biggest_challenges', [])
    if isinstance(challenges, str):
        try:
            import json
            challenges = json.loads(challenges)
        except:
            challenges = []
    
    detailed_challenge_points = 0
    if len(challenges) >= 2:
        detailed_challenge_points = 12
    elif any('other' in str(challenge).lower() and len(str(challenge)) >= 50 for challenge in challenges):
        detailed_challenge_points = 12
    
    behavioral_score += detailed_challenge_points
    score_breakdown['details']['detailed_challenges'] = detailed_challenge_points
    
    # Manual hours ≥20
    manual_hours = int(submission_data.get('manual_hours_per_week', 0))
    if manual_hours >= 20:
        behavioral_score += 10
        score_breakdown['details']['high_manual_hours'] = 10
    
    # Cap behavioral at 52 points
    behavioral_score = min(behavioral_score, 52)
    score_breakdown['behavioral'] = behavioral_score
    
    # FIT SCORING (25% weight, max 38 points)
    fit_score = 0
    
    # Industry fit
    industry = submission_data.get('industry', '').lower()
    high_fit_industries = ['fashion', 'beauty', 'sports', 'food-beverage', 'food & beverage']
    
    if any(ind in industry for ind in high_fit_industries):
        industry_points = 15
    else:
        industry_points = 10
    
    fit_score += industry_points
    score_breakdown['details']['industry_fit'] = industry_points
    
    # Core challenge alignment
    core_challenges = ['manual processes', 'low conversion', 'high cart abandonment']
    challenge_alignment = 0
    
    if isinstance(challenges, list):
        for challenge in challenges:
            challenge_str = str(challenge).lower()
            if any(core in challenge_str for core in core_challenges):
                challenge_alignment = 13
                break
    
    fit_score += challenge_alignment
    score_breakdown['details']['challenge_alignment'] = challenge_alignment
    
    # Cap fit at 38 points
    fit_score = min(fit_score, 38)
    score_breakdown['fit'] = fit_score
    
    # TOTAL SCORE AND TIER
    total_score = demographic_score + behavioral_score + fit_score
    
    # Determine tier
    if total_score >= 90:
        tier = 'Hot'
    elif total_score >= 60:
        tier = 'Warm'
    else:
        tier = 'Cold'
    
    return total_score, tier, score_breakdown


def get_hubspot_lifecycle_stage(tier):
    """Map tier to HubSpot lifecycle stage"""
    tier_mapping = {
        'Hot': 'salesqualifiedlead',  # SQL
        'Warm': 'marketingqualifiedlead',  # MQL
        'Cold': 'lead'  # Lead
    }
    return tier_mapping.get(tier, 'lead')


def get_follow_up_timeline(tier):
    """Get follow-up timeline based on tier"""
    timeline_mapping = {
        'Hot': 1,  # 1 hour
        'Warm': 24,  # 24 hours
        'Cold': 72  # 3 days (72 hours)
    }
    return timeline_mapping.get(tier, 72)

