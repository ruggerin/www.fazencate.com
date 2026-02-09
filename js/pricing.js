/* ============================================
   FazEncarte.com - Pricing (dinâmico)

   Para conectar na API, basta alterar getPlans()
   para fazer um fetch e retornar a mesma estrutura.
   ============================================ */

(function () {

  // ---------- DADOS DOS PLANOS ----------
  // Futuramente: substitua por  fetch('/api/plans').then(r => r.json())
  function getPlans() {
    return Promise.resolve([
      {
        name: 'Iniciante',
        description: 'Ideal para pequenos mercados',
        popular: false,
        price: null,            // null = grátis
        currency: null,
        period: null,
        priceLabel: 'Grátis',   // exibido quando price é null
        features: [
          '5 encartes por mês',
          'Temas básicos',
          'Download em PDF',
          "Marca d'água discreta"
        ],
        cta: { label: 'Começar Grátis', url: 'em-breve.html', style: 'outline' }
      },
      {
        name: 'Premium',
        description: 'Para mercados estabelecidos',
        popular: true,
        price: 69,
        currency: 'R$',
        period: '/mês',
        priceLabel: null,
        features: [
          'Encartes ilimitados',
          'Todos os temas premium',
          "Sem marca d'água",
          'Download em alta resolução',
          'Temas personalizados',
          'Suporte prioritário'
        ],
        cta: { label: 'Assinar Agora', url: 'em-breve.html', style: 'filled' }
      },
      {
        name: 'Empresarial',
        description: 'Tudo personalizado para a sua operação',
        popular: false,
        price: null,
        currency: null,
        period: null,
        priceLabel: null,
        features: [
          'Tudo do Premium',
          'Ambiente Exclusivo',
          'Múltiplas lojas',
          'Colaboração em equipe',
          'API de integração',
          'Gerente de conta dedicado',
          'Treinamento personalizado'
        ],
        cta: { label: 'Falar com Especialista', url: 'contato.html', style: 'outline' }
      }
    ]);
  }

  // ---------- RENDERIZAÇÃO ----------
  function buildPriceHTML(plan) {
    if (plan.priceLabel) {
      return '<div class="pricing-price"><span class="price-value">' + plan.priceLabel + '</span></div>';
    }
    if (plan.price !== null) {
      return '<div class="pricing-price">' +
        (plan.currency ? '<span class="price-currency">' + plan.currency + '</span>' : '') +
        '<span class="price-value">' + plan.price + '</span>' +
        (plan.period ? '<span class="price-period">' + plan.period + '</span>' : '') +
        '</div>';
    }
    return '';
  }

  function buildCardHTML(plan, index) {
    var delay = (index + 1) * 100;
    var isPopular = plan.popular;
    var cardClass = 'pricing-card' + (isPopular ? ' pricing-popular' : '');
    var btnClass = isPopular ? 'btn btn-primary-gradient w-100' : 'btn btn-outline-primary-gradient w-100';

    var featuresHTML = plan.features.map(function (f) {
      return '<li><i class="bi bi-check-circle-fill"></i> ' + f + '</li>';
    }).join('');

    return '' +
      '<div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="' + delay + '">' +
        '<div class="' + cardClass + '">' +
          (isPopular ? '<span class="popular-badge">Mais Popular</span>' : '') +
          '<div class="pricing-header">' +
            '<h5>' + plan.name + '</h5>' +
            '<p class="pricing-desc">' + plan.description + '</p>' +
            buildPriceHTML(plan) +
          '</div>' +
          '<ul class="pricing-features">' + featuresHTML + '</ul>' +
          '<a href="' + plan.cta.url + '" class="' + btnClass + '">' + plan.cta.label + '</a>' +
        '</div>' +
      '</div>';
  }

  function renderPlans(plans) {
    var container = document.getElementById('pricing-cards');
    if (!container) return;

    container.innerHTML = plans.map(buildCardHTML).join('');

    // Re-inicializa AOS nos novos elementos
    if (typeof AOS !== 'undefined') {
      AOS.refreshHard();
    }
  }

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', function () {
    getPlans().then(renderPlans);
  });

})();
