<section class="free-ebook-sec loc-wrapper-free-ebook">
    <div class="container">
        <div class="free-ebook-main wrapper-ebook-main">
            <div class="ebook-left">
                <div class="ebook-left-one">
                    <div class="heading-ebook">
                        <h2>Establish your business presence in Orlando</h2>
                        <p>All-Inclusive Virtual Office Services for <strong> Only  $99 </strong> </p>
                    </div>
                    <div class="loc-wrapper-ebook-btn">
                        <a href="/signup/?btn=4&locid=<?= $locationId; ?>"  class=" btn-brand-blue">Get started with this location </a>
                    </div>
                </div>
                <div class="ebook-left-two" style="display: none">
                    <div class="inbox-details">
                        <div class="check-inbox-cont">
                            <div class="email-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="99" height="100" viewBox="0 0 99 100" fill="none">
                                    <path d="M88.6874 74.75L61.2857 50M37.7143 50L10.3126 74.75M8.25 29.375L41.9303 52.9512C44.6576 54.8603 46.0213 55.8149 47.5046 56.1846C48.8148 56.5112 50.1852 56.5112 51.4954 56.1846C52.9787 55.8149 54.3424 54.8603 57.0697 52.9512L90.75 29.375M28.05 83H70.95C77.8806 83 81.346 83 83.9931 81.6512C86.3216 80.4648 88.2148 78.5716 89.4012 76.2431C90.75 73.596 90.75 70.1306 90.75 63.2V36.8C90.75 29.8694 90.75 26.404 89.4012 23.7569C88.2148 21.4284 86.3216 19.5352 83.9931 18.3488C81.346 17 77.8806 17 70.95 17H28.05C21.1194 17 17.654 17 15.0069 18.3488C12.6784 19.5352 10.7852 21.4284 9.59879 23.7569C8.25 26.404 8.25 29.8694 8.25 36.8V63.2C8.25 70.1306 8.25 73.596 9.59879 76.2431C10.7852 78.5716 12.6784 80.4648 15.0069 81.6512C17.654 83 21.1194 83 28.05 83Z" stroke="black" stroke-width="8.25" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <p class="inbox-title">Check your inbox</p>
                        </div>

                        <p class="inbox-txt">Thank you for submitting your information! Check your email for your personal copy of the <br>6 Steps of Starting a Business</p>
                    </div>
                </div>
            </div>
            <div class="ebook-right-img">
                <img src="<?=get_template_directory_uri()?>/assets/images/vos-cta-img.webp">
            </div>
        </div>

    </div>
</section>
<script>
    $(document).on('gform_confirmation_loaded', function(event, formId) {
        if (formId == 29) { // Adjust form ID as needed
            $('.ebook-left-one').hide();
            $('.ebook-left-two').show();
        }
    });
</script>
<style>
    .free-ebook-main.wrapper-ebook-main {
        align-items: center;
    }

    .free-ebook-main.wrapper-ebook-main .ebook-left-one {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
        justify-content: center;
        padding-right: 30px;
    }
    .free-ebook-main.wrapper-ebook-main .ebook-left {
        display: flex;
        padding: 20px 64px 20px 64px;
        max-width: 767px;
        width: 100%;
    }
    .heading-ebook p {
        color: #475467;
    }
    .loc-wrapper-ebook-btn {
        width: 100%;
        max-width: 600px;
    }
    .loc-wrapper-ebook-btn a {
        padding: 16px 22px;
        width: 100%;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 28px;
        height: 60px;
    }
    .free-ebook-sec.loc-wrapper-free-ebook{padding: 0px; margin: 0px;}
    .location-sections-wrapper .container{padding: 0;max-width: 1216px; width: 100%;}

    .free-ebook-main.wrapper-ebook-main  {
        border-radius: 16px;
        background:
                url("<?= get_template_directory_uri() ?>/assets/images/vos-cta-bg-dsk.webp")
                center center / cover no-repeat,
                #fff;
        box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);

    }
    @media (max-width: 767px){
        .free-ebook-main.wrapper-ebook-main  {
            border-radius: 16px;

            background:
                    url("<?= get_template_directory_uri() ?>/assets/images/vos-mobile.webp")
                    center center / cover no-repeat,
                    #fff;
            box-shadow:
                    0px 4px 8px -2px rgba(16, 24, 40, 0.10),
                    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
        }
        .free-ebook-main.wrapper-ebook-main .ebook-left {
            display: flex;
            padding: 20px 16px 20px 14px !important;
            max-width: 767px;
            width: 100%;
            margin-bottom: 0;
        }
        .free-ebook-main.wrapper-ebook-main .ebook-right-img{
            padding-top: 20px;
        }
        .free-ebook-main.wrapper-ebook-main .ebook-right-img img {
            width: 316px;
        }
        .loc-wrapper-ebook-btn a {
            padding: 8px 12px;
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            height: 36px;
        }
        .free-ebook-main.wrapper-ebook-main .heading-ebook h2 {
            font-size: 36px;
            line-height: 44px;
            letter-spacing: -0.72px;
            text-align: center;
        }
        .heading-ebook p {
            color: #475467;
            text-align: center;
        }
    }

</style>