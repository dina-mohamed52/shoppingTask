import React from "react";
import { Card, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const offerDetails = [
    { quantity: "4 قطع", price: "300 ج" },
    { quantity: "6 قطع", price: "420 ج" },
    { quantity: "8 قطع", price: "540 ج" },
    { quantity: "دسته 12 قطعة", price: "750 ج" },
];

function Offers() {
    return (
        <Card
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                maxWidth: "600px",
                margin: "2rem auto",
                padding: "2rem", // Responsive padding can be controlled via media queries
                border: "1px solid #d83f87",
                height: "auto", // Allow content to fit
                textAlign: "center",
            }}
            title={
                <Title level={3} style={{ color: "#d83f87", marginBottom: "1rem", fontWeight: "bold" }}>
                    عروض الكولونات الشتوية للأطفال
                </Title>
            }
        >
            <Text style={{ fontSize: "14px", color: "#333", lineHeight: 1.5 }}>
                بأفضل خامة شتوي وتقفيل لكولونات الأطفال، الخامة 90% قطن تقيل + 10% ليكرا معالج. ضد الحساسية وناعمة على البشرة.
                <br /> متوفر بمقاسات من حديث الولادة حتى 14 سنة.
            </Text>

            <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
                {offerDetails.map((offer, index) => (
                    <Col xs={24} sm={12} key={index}> {/* Responsive grid */}
                        <Card
                            style={{
                                textAlign: "center",
                                borderRadius: "8px",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                marginBottom: "1rem",
                                backgroundColor: "#f8f9fa",
                                padding: "1rem", // Add padding for the inner cards
                            }}
                        >
                            <Text strong style={{ color: "#d83f87", fontSize: "16px" }}>
                                {offer.quantity}
                            </Text>
                            <br />
                            <Text style={{ color: "#52c41a", fontWeight: "bold", fontSize: "14px" }}>
                                بسعر {offer.price} ❤🥰
                            </Text>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Text style={{ fontSize: "14px", color: "#333", lineHeight: 1.5, marginTop: "1rem" }}>
                متاح تشكيل ألوان وأشكال ومقاسات مختلفة. <br />
                متاح معاينة قبل الاستلام للتأكيد على الجودة والمقاس ✨
            </Text>
        </Card>
    );
}

export default Offers;
