import { NextPage } from 'next'
import Head from 'next/head'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import { CartItems } from '../../redux/reducers/cart'
import { setCategory, setSortBy } from '../../redux/actions/filter'
import { fetchPizza, setIsLoaded } from '../../redux/actions/pizza'
import { addPizzaToCart } from '../../redux/actions/cart'

import {
  Categories,
  SortPopup,
  PizzaBlock,
  PizzaBlockPlaceholder,
  Container,
} from '../../components'
import {
  CATEGORIES,
  SORT_PARAMETER,
  PIZZA_TO_SHOW,
  SortParameter,
} from '../../utils/constants'

import Pizza, { ChosenPizza } from '../../models/Pizza'
import { RootState } from '../../models/Store'

import styles from './Styles.module.scss'

const categories = CATEGORIES
const sortParameters = SORT_PARAMETER

// React.memo is equal to ShouldComponentUpdate
const Home: NextPage = React.memo((): JSX.Element => {
  const dispatch = useDispatch<Dispatch>()
  const pizzas = useSelector<RootState, Array<Pizza>>(({ pizza }) => [
    ...pizza.items,
  ])
  const isLoaded = useSelector<RootState, boolean>(
    ({ pizza }) => pizza.isLoaded
  )
  const cartItems = useSelector<RootState, CartItems>(({ cart }) => cart.items)
  const { category, sortBy } = useSelector<
    RootState,
    { category: string; sortBy: SortParameter }
  >(({ filter }) => filter)

  useEffect(() => {
    dispatch(setIsLoaded(true))

    fetchPizza(category, sortBy)(dispatch)

    dispatch(setIsLoaded(false))
  }, [dispatch, category, sortBy])

  const handleCategoryClick = useCallback(
    (item: string) => {
      dispatch(setCategory(item))
    },
    [dispatch]
  )

  const handleSortClick = useCallback(
    (item: SortParameter) => {
      dispatch(setSortBy(item))
    },
    [dispatch]
  )

  const handlePizzaButtonClick = useCallback(
    (pizza: ChosenPizza) => dispatch(addPizzaToCart(pizza)),
    [dispatch]
  )

  return (
    <>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/favicon.png' />

        <title>Best'n Top Pizza Shop</title>
      </Head>

      <Container>
        <div className={styles.heading}>
          <h3>The Best Pizza </h3>

          <svg
            width='1046'
            height='278'
            viewBox='0 0 1046 278'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M45.0932 99.4819C60.0692 99.4819 67.5572 110.328 67.5572 132.022C67.5572 146.667 65.1346 161.698 60.2894 177.115C57.7567 185.153 54.7285 192.476 51.2047 199.083C47.7911 205.58 43.4414 210.866 38.1558 214.94C32.9802 219.125 27.3092 221.217 21.1426 221.217C15.0861 221.217 10.2409 219.235 6.60706 215.271C2.97318 211.416 1.15624 206.406 1.15624 200.239C1.15624 191.43 4.73506 183.281 11.8927 175.793C19.1605 168.305 28.3553 162.029 39.4772 156.963C41.0188 148.484 41.7896 140.556 41.7896 133.178C41.7896 125.69 41.0739 120.569 39.6424 117.816C38.2108 115.063 36.1186 113.687 33.3656 113.687C30.7228 113.687 27.5294 114.403 23.7854 115.834C20.0414 117.266 16.4626 119.193 13.0489 121.616L8.58918 115.008C13.2141 110.934 18.8852 107.355 25.6024 104.272C32.4296 101.079 38.9266 99.4819 45.0932 99.4819ZM37.8254 169.847C31.1082 172.71 25.3821 176.729 20.6471 181.905C15.912 186.97 13.5445 192.146 13.5445 197.431C13.5445 202.607 15.5816 205.195 19.656 205.195C23.1798 205.085 26.5384 202.222 29.7318 196.606C33.0353 190.879 35.7332 181.96 37.8254 169.847ZM75.2276 215.271H72.0892C72.0892 210.095 73.6308 200.184 76.7141 185.539C79.9076 170.893 81.5043 162.579 81.5043 160.597C81.5043 156.963 79.9626 153.109 76.8793 149.035L75.3927 147.053L75.5579 144.905C81.5043 143.254 91.0294 142.428 104.133 142.428C105.565 144.3 106.336 147.713 106.446 152.669C116.026 145.291 124.12 141.602 130.727 141.602C134.691 141.602 137.829 142.978 140.142 145.731C142.564 148.484 143.776 151.953 143.776 156.137C143.776 160.212 142.509 167.314 139.977 177.445C137.444 187.576 136.178 194.403 136.178 197.927C136.178 201.341 136.618 203.047 137.499 203.047C138.16 203.047 140.472 202.001 144.436 199.909L146.419 198.918L149.392 204.699C148.401 205.58 147.079 206.681 145.428 208.003C143.776 209.324 140.692 211.141 136.178 213.454C131.773 215.656 127.809 216.757 124.285 216.757C116.246 216.757 112.227 212.187 112.227 203.047C112.227 199.193 113.438 192.091 115.861 181.74C118.394 171.389 119.66 164.727 119.66 161.753C119.66 158.78 118.724 157.294 116.852 157.294C113.659 157.294 109.749 158.67 105.124 161.423C104.794 163.295 103.693 168.25 101.821 176.289C97.9668 193.577 96.0398 205.8 96.0398 212.958C92.1857 214.5 85.2483 215.271 75.2276 215.271ZM216.62 116.33C207.48 116.33 200.102 118.587 194.486 123.102C191.073 121.34 189.09 119.909 188.54 118.808C188.54 112.2 190.192 106.364 193.495 101.299C196.799 96.1233 201.644 93.5355 208.031 93.5355C214.638 93.5355 225.099 97.1694 239.414 104.437C244.7 107.19 248.169 108.787 249.82 109.227C254.115 105.814 258.85 103.006 264.026 100.803C269.311 98.6009 273.881 97.4997 277.735 97.4997C281.699 97.4997 285.333 98.656 288.637 100.968C291.94 103.281 293.592 106.75 293.592 111.375C293.592 115.999 291.72 120.074 287.976 123.598C284.342 127.121 279.222 128.883 272.615 128.883C269.642 128.883 266.338 128.443 262.704 127.562C259.18 126.571 257.033 126.02 256.262 125.91C252.849 129.324 249.05 134.059 244.865 140.115C240.791 146.062 237.322 152.283 234.459 158.78C236.221 158.56 237.542 158.45 238.423 158.45C246.902 158.45 254.445 160.927 261.052 165.883C267.77 170.728 271.128 177.445 271.128 186.034C271.128 194.623 267.935 202.167 261.548 208.663C255.271 215.16 246.737 218.409 235.946 218.409C225.154 218.409 216.84 214.83 211.004 207.672C205.278 200.515 202.415 192.146 202.415 182.566C195.477 189.063 191.018 196.165 189.035 203.873C186.503 203.433 184.08 202.662 181.768 201.561C179.455 200.35 177.969 199.193 177.308 198.092C181.602 187.191 190.742 176.95 204.727 167.369C207.37 158.78 211.61 150.301 217.446 141.932C223.392 133.563 229.724 126.13 236.441 119.633C229.504 117.431 222.897 116.33 216.62 116.33ZM259.731 185.539C259.731 180.804 257.694 176.95 253.619 173.976C249.545 170.893 245.361 169.351 241.066 169.351C236.771 169.351 233.138 169.957 230.164 171.168C229.063 174.912 228.513 179.427 228.513 184.713C228.513 189.888 229.944 194.403 232.807 198.257C235.78 202.001 239.524 203.873 244.039 203.873C248.664 203.873 252.408 202.001 255.271 198.257C258.244 194.403 259.731 190.164 259.731 185.539ZM283.186 112.531C283.186 110.439 281.589 109.392 278.396 109.392C275.313 109.392 271.128 111.705 265.842 116.33C267.825 117.431 270.247 117.982 273.11 117.982C275.973 117.982 278.341 117.486 280.213 116.495C282.195 115.504 283.186 114.183 283.186 112.531ZM305.92 105.759C305.92 102.125 305.589 99.5369 304.929 97.9953C313.518 95.0221 321.611 93.5355 329.21 93.5355C330.201 94.5266 330.696 97.0593 330.696 101.134C330.696 108.401 327.613 125.139 321.446 151.347C330.366 144.85 338.184 141.602 344.901 141.602C349.086 141.602 352.224 142.923 354.316 145.566C356.519 148.209 357.62 151.733 357.62 156.137C357.62 160.432 356.354 167.535 353.821 177.445C351.288 187.246 350.022 193.963 350.022 197.597C350.022 201.231 350.462 203.047 351.343 203.047C352.224 203.047 354.537 202.056 358.281 200.074L360.263 199.083L363.236 204.864C362.245 205.745 360.923 206.847 359.272 208.168C357.62 209.489 354.592 211.251 350.187 213.454C345.782 215.656 341.708 216.757 337.964 216.757C334.33 216.757 331.412 215.601 329.21 213.288C327.007 210.866 325.906 207.672 325.906 203.708C325.906 199.634 327.117 192.311 329.54 181.74C332.073 171.058 333.339 164.341 333.339 161.588C333.339 158.725 332.183 157.294 329.87 157.294C327.007 157.294 323.428 158.505 319.134 160.928C313.077 187.576 310.049 204.864 310.049 212.793C305.424 214.555 297.551 215.436 286.429 215.436C286.319 213.564 286.264 211.912 286.264 210.48C286.264 205.745 289.512 189.558 296.009 161.919C302.616 134.279 305.92 115.559 305.92 105.759ZM367.876 186.199C367.876 172.435 372.006 161.588 380.265 153.66C388.634 145.621 398.104 141.602 408.675 141.602C415.172 141.602 420.513 143.199 424.697 146.392C428.882 149.585 430.974 153.88 430.974 159.276C430.974 164.561 429.597 169.021 426.844 172.655C424.202 176.289 420.953 179.097 417.099 181.079C409.281 184.933 402.123 187.356 395.626 188.347L391.662 188.842C392.433 199.193 396.672 204.369 404.38 204.369C407.023 204.369 409.831 203.708 412.804 202.387C415.778 201.065 418.09 199.744 419.742 198.423L422.219 196.44L426.184 201.726C425.303 202.937 423.541 204.534 420.898 206.516C418.255 208.498 415.778 210.15 413.465 211.471C407.078 214.995 400.086 216.757 392.488 216.757C384.89 216.757 378.888 214.059 374.483 208.663C370.079 203.268 367.876 195.78 367.876 186.199ZM391.497 180.749C397.113 179.758 401.572 177.39 404.876 173.646C408.179 169.902 409.831 165.057 409.831 159.111C409.831 153.164 408.069 150.191 404.546 150.191C400.361 150.191 397.113 153.77 394.8 160.928C392.598 167.975 391.497 174.582 391.497 180.749ZM497.31 194.458L498.301 166.378C487.73 165.057 478.865 161.478 471.708 155.642C464.55 149.806 460.971 141.987 460.971 132.187C460.971 124.148 464.936 116.385 472.864 108.897C480.793 101.299 490.263 97.4997 501.274 97.4997C517.462 97.4997 525.555 108.016 525.555 129.048C525.555 135.215 525.115 144.685 524.234 157.459C523.463 170.122 523.078 179.703 523.078 186.199C523.078 192.696 524.84 195.945 528.363 195.945C530.456 195.945 533.484 194.183 537.448 190.659C541.522 187.025 544.936 183.116 547.689 178.932C550.112 154.045 551.323 139.179 551.323 134.334C551.323 129.489 551.268 126.185 551.158 124.423C551.158 122.662 551.048 120.955 550.827 119.303C550.717 117.651 550.607 116.44 550.497 115.669C550.497 114.788 550.277 113.632 549.836 112.2C549.506 110.769 549.286 109.943 549.176 109.723C549.176 109.503 548.9 108.567 548.35 106.915C547.909 105.263 547.689 104.382 547.689 104.272C553.305 101.299 562.5 99.0414 575.273 97.4997V97.6649C576.485 101.519 577.09 107.08 577.09 114.348C577.09 121.505 575.989 134.004 573.787 151.843C571.585 169.682 570.483 181.519 570.483 187.356C570.483 193.082 572.135 195.945 575.439 195.945C578.852 195.945 582.927 192.972 587.662 187.025C592.507 181.079 596.912 173.316 600.876 163.735C604.95 154.155 607.483 144.85 608.474 135.821C608.474 126.901 603.794 116.605 594.434 104.933C596.636 100.198 599.499 95.9581 603.023 92.2141C606.547 88.36 609.52 85.7172 611.943 84.2856L615.577 81.9732C619.651 81.9732 623.12 84.8913 625.983 90.7275C628.956 96.4536 630.442 103.226 630.442 111.044C630.442 118.752 628.35 128.718 624.166 140.941C619.981 153.054 614.696 164.727 608.309 175.959C602.032 187.191 594.599 196.826 586.01 204.864C577.531 212.793 569.437 216.757 561.729 216.757C557.765 216.757 554.296 214.775 551.323 210.811C548.35 206.847 546.808 201.781 546.698 195.615C541.963 202.222 536.953 207.397 531.667 211.141C526.381 214.885 521.096 216.757 515.81 216.757C510.524 216.757 506.12 214.61 502.596 210.315C499.072 206.021 497.31 200.735 497.31 194.458ZM499.788 129.379C499.788 122.551 499.127 117.927 497.806 115.504C496.594 112.971 494.172 111.705 490.538 111.705C487.014 111.705 482.885 113.687 478.15 117.651C473.525 121.616 471.212 126.791 471.212 133.178C471.212 139.565 473.965 144.85 479.471 149.035C485.087 153.219 491.584 155.311 498.962 155.311C499.513 144.85 499.788 136.206 499.788 129.379ZM647.169 216.757C639.571 216.757 633.625 214.114 629.33 208.829C625.035 203.433 622.888 195.945 622.888 186.365C622.888 174.142 626.137 163.625 632.634 154.816C639.241 146.007 648.325 141.602 659.888 141.602L665.834 141.932C667.706 140.941 669.798 140.446 672.111 140.446C680.81 140.446 685.16 148.649 685.16 165.057C689.675 164.837 694.244 164.231 698.869 163.24L701.512 162.579L702.503 169.021C698.869 170.563 693.969 171.939 687.803 173.151L684.499 173.811C682.407 185.374 678.167 195.449 671.78 204.039C665.394 212.518 657.19 216.757 647.169 216.757ZM656.089 202.552C660.714 202.552 664.843 199.579 668.477 193.632C672.221 187.686 674.809 181.409 676.24 174.802C664.458 174.802 658.566 170.398 658.566 161.588C658.566 158.064 659.282 154.761 660.714 151.678L661.539 150.026C661.099 149.806 660.548 149.695 659.888 149.695C659.227 149.695 658.731 149.806 658.401 150.026C655.648 151.788 653.06 155.917 650.638 162.414C648.215 168.911 647.004 176.344 647.004 184.713C647.004 196.606 650.032 202.552 656.089 202.552ZM692.676 215.271H691.52C691.3 214.39 691.19 212.407 691.19 209.324C691.19 206.131 692.676 197.652 695.65 183.887C698.623 170.122 700.109 162.249 700.109 160.267C700.109 156.853 698.568 153.109 695.484 149.035L693.998 147.053L694.163 144.905C700.109 143.254 709.635 142.428 722.739 142.428C724.06 145.291 724.721 149.31 724.721 154.486C725.932 152.503 728.465 149.861 732.319 146.557C736.173 143.254 740.137 141.602 744.212 141.602C750.158 141.602 753.131 146.777 753.131 157.128C752.58 157.789 751.81 158.67 750.819 159.771C749.938 160.762 748.066 162.194 745.203 164.066C742.45 165.938 739.752 167.094 737.109 167.535C736.999 167.535 736.063 166.048 734.301 163.075C732.539 160.102 731.218 158.615 730.337 158.615C727.584 159.606 725.161 161.258 723.069 163.57C718.004 186.365 715.471 201.12 715.471 207.838C715.471 210.26 715.526 211.967 715.636 212.958C711.782 214.5 704.129 215.271 692.676 215.271ZM762.258 216.757C758.514 216.757 755.376 215.491 752.843 212.958C750.421 210.425 749.209 206.902 749.209 202.387C749.209 197.762 751.907 183.171 757.303 158.615C762.809 133.949 765.562 116.165 765.562 105.263L764.571 97.9953C773.16 95.0221 781.199 93.5355 788.687 93.5355C789.788 95.0772 790.338 97.775 790.338 101.629C790.338 110.439 787.53 127.507 781.914 152.834C776.408 178.051 773.656 192.751 773.656 196.936C773.656 201.01 774.151 203.047 775.142 203.047L786.704 198.918L789.678 204.699C785.934 207.672 781.364 210.425 775.968 212.958C770.682 215.491 766.112 216.757 762.258 216.757ZM871.708 204.699C862.348 212.738 854.09 216.757 846.932 216.757C839.884 216.757 835.81 213.233 834.709 206.186C831.405 209.489 827.716 212.077 823.642 213.949C819.568 215.821 815.989 216.757 812.906 216.757C807.62 216.757 803.105 214.445 799.361 209.82C795.617 205.195 793.745 198.037 793.745 188.347C793.745 173.811 796.828 162.414 802.995 154.155C809.162 145.786 816.099 141.602 823.807 141.602C831.626 141.602 838.178 143.364 843.463 146.888C846.877 129.048 848.584 115.008 848.584 104.768L847.758 97.8301C856.017 94.967 864.11 93.5355 872.039 93.5355C872.92 95.4075 873.36 97.5548 873.36 99.9774C873.36 108.016 870.938 124.368 866.092 149.035C861.247 173.591 858.825 190.274 858.825 199.083C858.825 201.726 859.43 203.047 860.642 203.047C861.302 203.047 863.395 202.001 866.918 199.909L868.57 198.918L871.708 204.699ZM831.901 151.347C828.047 151.347 824.688 155.146 821.825 162.744C819.072 170.343 817.696 177.886 817.696 185.374C817.696 192.751 818.191 197.487 819.182 199.579C820.283 201.671 821.88 202.717 823.972 202.717C827.606 202.717 831.185 201.231 834.709 198.257C835.039 193.853 837.517 179.207 842.142 154.32C838.398 152.338 834.984 151.347 831.901 151.347Z'
              fill='white'
            />
            <path
              d='M503.114 160.017C391.03 22.6507 707.902 -39.7119 859.594 59.7311C1011.29 159.174 1048 74.4995 1031.51 59.7311'
              stroke='white'
              strokeWidth='20.2257'
            />
          </svg>
        </div>

        <div className={styles.catalog}>
          <div className={styles.top}>
            <Categories
              activeCategory={category}
              items={categories}
              onCategoryClick={handleCategoryClick}
            />
          </div>

          <div className={styles.middle}>
            <h2>
              <strong>Our</strong> pizza:
            </h2>

            <SortPopup
              activeSortBy={sortBy}
              items={sortParameters}
              onSortClick={handleSortClick}
            />
          </div>

          <div className={styles.items}>
            {isLoaded
              ? pizzas.map((pizza) => {
                  return (
                    <PizzaBlock
                      amountOfItemsInCart={
                        cartItems[pizza.id]?.items?.length || 0
                      }
                      onButtonClick={handlePizzaButtonClick}
                      key={pizza.id}
                      pizza={pizza}
                    />
                  )
                })
              : Array(PIZZA_TO_SHOW)
                  .fill(0)
                  .map((_, idx) => <PizzaBlockPlaceholder key={idx} />)}
          </div>
        </div>
      </Container>
    </>
  )
})

export default Home
