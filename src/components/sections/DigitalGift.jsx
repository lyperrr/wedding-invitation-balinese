/** @format */

import Typography from "../ui/typography";
import {
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
} from "../../lib/animations";
import { useDigitalGift } from "@/hooks/useDigitalGift";
import BankCard from "./digital-gift/BankCard";
import AccountInfo from "./digital-gift/AccountInfo";

const DigitalGift = () => {
  const giftData = {
    title: "Hadiah Digital",
    message:
      "Doa restu Anda adalah karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.",
    bankAccounts: [
      {
        id: 1,
        bankName: "Bank BCA",
        accountNumber: "7730818828",
        accountDisplay: "7730 8188 28",
        holderName: "I Kadek Dwiyana Bakti",
      },
      {
        id: 2,
        bankName: "BPD BALI",
        accountNumber: "0220215841548",
        accountDisplay: "0220 1584 1548",
        holderName: "Luh Putu Yuningsih, S.H",
      },
    ],
  };

  const { copiedId, handleCopy } = useDigitalGift(giftData.bankAccounts);

  return (
    <section className="py-10">
      <div className="container">
        <ScrollReveal threshold={0.3}>
          <StaggerContainer staggerDelay={0.2}>
            {/* Header */}
            <StaggerItem>
              <div className="text-center mb-12">
                <Typography
                  variant="h2"
                  className="text-accent font-playfair tracking-widest"
                >
                  {giftData.title}
                </Typography>
                <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-accent to-transparent mx-auto my-4" />
                <Typography className="text-center max-w-2xl mx-auto text-sm text-primary">
                  {giftData.message}
                </Typography>
              </div>
            </StaggerItem>

            {/* Bank Cards */}
            <div className="max-w-2xl mx-auto space-y-8">
              {giftData.bankAccounts.map((bank) => (
                <StaggerItem key={bank.id}>
                  <div className="space-y-4">
                    {/* Card */}
                    <BankCard
                      bankName={bank.bankName}
                      accountDisplay={bank.accountDisplay}
                      holderName={bank.holderName}
                    />

                    {/* Info Panel */}
                    <AccountInfo
                      accountDisplay={bank.accountDisplay}
                      accountNumber={bank.accountNumber}
                      bankId={bank.id}
                      copiedId={copiedId}
                      onCopy={handleCopy}
                    />
                  </div>
                </StaggerItem>
              ))}
            </div>

            {/* Footer Message */}
            <StaggerItem>
              <div className="text-center mt-5">
                <div className="h-0.5 w-1/3 bg-linear-90 from-transparent via-accent to-transparent mx-auto mb-4" />
                <Typography className="text-sm italic text-primary/70">
                  Terima kasih atas perhatian dan doa restunya
                </Typography>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DigitalGift;
