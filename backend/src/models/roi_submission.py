from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric
from datetime import datetime
import uuid
import json

db = SQLAlchemy()

class ROISubmission(db.Model):
    __tablename__ = 'roi_submissions'
    
    # Primary identifiers
    id = db.Column(db.Integer, primary_key=True)
    submission_id = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    ip_address = db.Column(db.String(45))  # IPv6 compatible
    
    # Business metrics
    monthly_revenue = db.Column(Numeric(12, 2), nullable=False)
    average_order_value = db.Column(Numeric(10, 2), nullable=False)
    monthly_orders = db.Column(db.Integer, nullable=False)
    industry = db.Column(db.String(100), nullable=False)
    conversion_rate = db.Column(Numeric(5, 2), nullable=False)  # Percentage with 2 decimals
    cart_abandonment_rate = db.Column(Numeric(5, 2), nullable=False)
    monthly_ad_spend = db.Column(Numeric(12, 2))  # Optional
    manual_hours_per_week = db.Column(db.Integer, nullable=False)
    business_stage = db.Column(db.String(50), nullable=False)
    biggest_challenges = db.Column(db.Text)  # JSON string
    
    # Contact information (encrypted fields)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False)  # Will be encrypted
    business_name = db.Column(db.String(200), nullable=False)
    website = db.Column(db.String(255))  # Optional
    phone = db.Column(db.String(50))  # Optional, will be encrypted
    
    # Lead scoring and tier
    lead_score = db.Column(db.Integer, nullable=False, default=0)
    tier = db.Column(db.String(20), nullable=False, default='Cold')  # Hot, Warm, Cold
    
    # Integration tracking
    hubspot_contact_id = db.Column(db.String(50))
    hubspot_deal_id = db.Column(db.String(50))
    email_sent = db.Column(db.Boolean, default=False)
    hubspot_synced = db.Column(db.Boolean, default=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<ROISubmission {self.submission_id} - {self.business_name}>'
    
    def to_dict(self):
        """Convert submission to dictionary for API responses"""
        return {
            'submission_id': self.submission_id,
            'timestamp': self.timestamp.isoformat(),
            'business_name': self.business_name,
            'industry': self.industry,
            'monthly_revenue': float(self.monthly_revenue),
            'lead_score': self.lead_score,
            'tier': self.tier,
            'email_sent': self.email_sent,
            'hubspot_synced': self.hubspot_synced
        }
    
    def get_challenges_list(self):
        """Parse challenges JSON string to list"""
        if self.biggest_challenges:
            try:
                return json.loads(self.biggest_challenges)
            except json.JSONDecodeError:
                return []
        return []
    
    def set_challenges_list(self, challenges):
        """Set challenges from list to JSON string"""
        self.biggest_challenges = json.dumps(challenges) if challenges else None
    
    def calculate_projections(self):
        """Calculate ROI projections for all three scenarios"""
        base_revenue = float(self.monthly_revenue)
        
        # Conservative scenario (10% increase)
        conservative = {
            'monthly_revenue': base_revenue * 1.10,
            'monthly_increase': base_revenue * 0.10,
            'annual_benefit': base_revenue * 0.10 * 12,
            'roi_percentage': 150,
            'break_even_months': 6
        }
        
        # Expected scenario (30% increase)
        expected = {
            'monthly_revenue': base_revenue * 1.30,
            'monthly_increase': base_revenue * 0.30,
            'annual_benefit': base_revenue * 0.30 * 12,
            'roi_percentage': 400,
            'break_even_months': 5
        }
        
        # Optimistic scenario (50% increase)
        optimistic = {
            'monthly_revenue': base_revenue * 1.50,
            'monthly_increase': base_revenue * 0.50,
            'annual_benefit': base_revenue * 0.50 * 12,
            'roi_percentage': 700,
            'break_even_months': 4
        }
        
        return {
            'conservative': conservative,
            'expected': expected,
            'optimistic': optimistic
        }

